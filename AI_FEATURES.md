# AI Features — Technical Reference

This document is the detailed reference for every AI-powered feature on the IMRI (Intact Market Research)
website: what each one does, exactly how it's wired up, what happens with and without API keys, and how to
extend it. For a quick overview and Vercel deployment steps, see the "AI Features" section in [README.md](./README.md).

## Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Environment variables](#environment-variables)
- [Live mode vs. demo mode](#live-mode-vs-demo-mode)
- [1. AI Chatbot](#1-ai-chatbot)
- [2. AI Research Brief Generator](#2-ai-research-brief-generator)
- [3. AI Survey Question Generator](#3-ai-survey-question-generator)
- [4. AI News Feed](#4-ai-news-feed)
- [File & dependency map](#file--dependency-map)
- [Running and testing locally](#running-and-testing-locally)
- [Vercel deployment notes](#vercel-deployment-notes)
- [Known limitations](#known-limitations)
- [Extending these features](#extending-these-features)

## Overview

The site has four AI-powered features, all built on two Vercel serverless functions:

| # | Feature | Where | Frontend component | Backend |
|---|---|---|---|---|
| 1 | AI Chatbot (+ file/image uploads) | Floating widget on every page | `src/components/AIChat/AIChat.jsx` | `POST /api/ai` (`mode: "chat"`) |
| 2 | AI Research Brief Generator | `/ai-tools` (tab 1) | `src/components/AITools/AITools.jsx` | `POST /api/ai` (`mode: "brief"`) |
| 3 | AI Survey Question Generator | `/ai-tools` (tab 2) | `src/components/AITools/AITools.jsx` | `POST /api/ai` (`mode: "survey"`) |
| 4 | AI News Feed | `/ai-news` | `src/components/News/News.jsx` | `GET /api/news?category=…` |

Every feature works immediately after deployment with **zero configuration**, using a built-in rule-based
"demo mode." Adding API keys upgrades each feature to real generative AI / live data without any code changes —
see [Live mode vs. demo mode](#live-mode-vs-demo-mode).

## Architecture

```
Browser (React SPA, Vite)
  │
  ├─ src/components/AIChat/AIChat.jsx  ──┐
  ├─ src/components/AITools/AITools.jsx ─┼─► POST /api/ai   (api/ai.js)   ──► Anthropic Messages API
  │                                       │                                    (@anthropic-ai/sdk)
  └─ src/components/News/News.jsx  ──────┴─► GET  /api/news (api/news.js) ──► NewsAPI.org (fetch)
                                                                            └─► Anthropic Messages API
                                                                                 (summarization only)
```

- **`api/ai.js`** — one serverless function, dispatched by a `mode` field in the POST body (`chat` / `brief` /
  `survey`). Chosen over three separate functions to keep the Claude-calling logic (client construction, system
  prompt, response-text extraction) in one place.
- **`api/news.js`** — a separate function because it has a different concern (fetching + shaping external data)
  and a different HTTP verb (`GET`, filterable by query string) — it only *optionally* calls Claude, for
  summarization.
- **`src/lib/attachments.js`** and **`src/lib/newsCategories.js`** — small shared modules imported by *both* the
  browser code and the serverless functions, so validation rules and category keys can never drift out of sync
  between frontend and backend. They contain no browser- or Node-only APIs, so they run fine in either
  environment.
- Both functions run on Vercel's **Node.js Serverless Functions** runtime (not Edge), because they need
  `Buffer` (for decoding attachments) and full `fetch`/Node APIs. Vercel picks this automatically for files
  under `/api` with no `export const config = { runtime: 'edge' }`.
- `vercel.json`'s SPA rewrite (`"source": "/((?!api/).*)"`) explicitly excludes `/api/*`, so both functions are
  reachable — this is the one non-default piece of Vercel config the project needs.

## Environment variables

Both are **optional**. Set them in the Vercel project's **Settings → Environment Variables**, or in a local
`.env` file (copy `.env.example`) for use with `vercel dev`.

| Variable | Used by | Get it from | Effect when set | Effect when unset |
|---|---|---|---|---|
| `ANTHROPIC_API_KEY` | `api/ai.js` (all 3 modes), `api/news.js` (summarization only) | [console.anthropic.com](https://console.anthropic.com) | Real Claude-generated responses; `mode: "live"` in every response | Rule-based demo responses; `mode: "demo"` in every response |
| `NEWS_API_KEY` | `api/news.js` | [newsapi.org/register](https://newsapi.org/register) (free tier) | Live headlines from NewsAPI.org, per category | Curated static demo article set |

Both functions echo which mode served the request as `"mode": "live" | "demo"` in the JSON response, so you can
verify configuration by inspecting the network response (the UI doesn't surface this to visitors).

## Live mode vs. demo mode

Every AI feature follows the same design: **try live, fall back to demo** — never fail outright just because a
key is missing.

| Feature | No keys | `ANTHROPIC_API_KEY` only | `NEWS_API_KEY` only | Both keys |
|---|---|---|---|---|
| Chatbot | Keyword-matched FAQ answers | Real Claude answers; can analyze attachments | — | Real Claude answers |
| Brief generator | Templated brief filled from your form inputs | Real Claude-drafted brief | — | Real Claude-drafted brief |
| Survey generator | Templated question bank filled from your inputs | Real Claude-drafted questions | — | Real Claude-drafted questions |
| News feed | 12 curated demo articles | Demo articles (no key to fetch live news) | Live headlines, source's own description as summary | Live headlines with AI-condensed one-sentence summaries |

Demo mode is not a "coming soon" placeholder — it's a fully functional, deterministic fallback designed to look
reasonable in a portfolio/preview deployment, and it degrades independently per-call (e.g. if the live Claude
call throws at runtime for `api/news.js`'s summarization step specifically, it logs the error and falls back to
the un-summarized NewsAPI descriptions rather than failing the whole request — see `summarizeWithAI` in
`api/news.js`).

---

## 1. AI Chatbot

**Component:** `src/components/AIChat/AIChat.jsx` — a floating button (bottom-right) that expands into a chat
panel. Mounted once in `src/Layout.jsx`, so it appears on every route.

**Endpoint:** `POST /api/ai` with `{ mode: "chat", messages: [...] }`

### Conversation handling

The API is stateless — the frontend keeps the full message history in React state and resends it every turn.
The backend trims to the last 12 messages (`trimmed = incoming.filter(...).slice(-12)`) to bound prompt size.

```jsonc
// Request
{
  "mode": "chat",
  "messages": [
    { "role": "user", "content": "What services do you offer?" },
    { "role": "assistant", "content": "IMRI offers Qualitative Research, ..." },
    { "role": "user", "content": "Tell me more about traffic research", "attachments": [] }
  ]
}

// Response
{ "result": "Our Traffic Research suite covers...", "mode": "live" }
```

### System prompt / persona

`COMPANY_CONTEXT` in `api/ai.js` gives Claude IMRI's identity, contact details, and full service list, with
instructions to answer concisely (2–5 sentences) and steer toward the Contact page. Model: `claude-haiku-4-5`
(chosen for low latency/cost on a high-traffic, low-complexity Q&A workload). Response `max_tokens: 800`.

### Demo mode (no `ANTHROPIC_API_KEY`)

`fallbackChat()` does keyword matching against the latest user message against an FAQ table (qualitative,
quantitative, traffic, analytics, contact, pricing, about, services) and returns a canned, on-brand answer; if
nothing matches, a generic prompt-to-contact-us reply. Attachment questions get a distinct message explaining
that analysis requires a configured key (see below) rather than silently ignoring the file.

### File & image attachments

The attach button (paperclip icon) accepts **PDF, DOCX, TXT, CSV, JPG, PNG, WEBP**. Rules live in
`src/lib/attachments.js` and are enforced identically on both sides:

| Rule | Value |
|---|---|
| Max files per message | 4 |
| Max size per file | 3 MB |
| Max combined size per message | 3 MB |
| Allowed types | `.jpg/.jpeg`, `.png`, `.webp` (images) · `.pdf`, `.docx`, `.txt`, `.csv` (documents) |

File type is resolved from the **filename extension**, not the browser-reported MIME type (unreliable for
`.docx`/`.csv` across operating systems).

**How each type reaches Claude** (`buildAttachmentContent()` in `api/ai.js`):

| Type | Handling |
|---|---|
| Images (JPG/PNG/WEBP) | Sent natively as an `image` content block (base64) — Claude's vision input analyzes it directly. |
| PDF | Sent natively as a `document` content block (base64) — Claude's built-in PDF understanding reads text *and* layout, no local parsing needed. |
| DOCX | Text-extracted server-side via `mammoth.extractRawText()`, then appended as a text block. |
| TXT / CSV | Decoded from base64 straight to a UTF-8 string, appended as a text block. |

Extracted/attached text is wrapped per-file (`--- Content of attached file "name.docx" --- ... --- end ---`) and
concatenated with the user's typed message into one trailing `text` content block, after any image/document
blocks — matching Anthropic's recommended ordering (media blocks before the text that references them).

**Only the newest message's attachments are ever sent.** Since the conversation is stateless and resent in
full every turn, re-uploading every historical file on every follow-up question would balloon the request body
and burn tokens. `AIChat.jsx`'s `sendMessage()` strips `attachments` from every message except the one just
added before POSTing; the frontend still displays attachment chips on past messages (they're just not
re-uploaded).

**Why 3 MB:** Vercel Serverless Functions (Node.js runtime, the type used here) have a **fixed, non-configurable
4.5 MB request body limit**. Base64 inflates raw bytes by ~1.33×, so a 3 MB raw budget becomes ~4 MB of base64
JSON — leaving headroom for the rest of the payload (conversation history, field names) under the 4.5 MB cap.

**Validation** happens twice: client-side in `validateFile()` (`src/lib/attachments.js`, called from
`AIChat.jsx`) for instant UX feedback before upload, and server-side in `buildAttachmentContent()` (`api/ai.js`)
using the *actual decoded byte length* — the client-reported `size` is never trusted for the hard limit, only
used for pre-upload UX. On any violation (bad type, oversized file, too many files, corrupt DOCX) the endpoint
returns `400` with a specific, user-facing message (e.g. `"\"virus.exe\" has an unsupported file type. Allowed:
PDF, DOCX, TXT, CSV, JPG, PNG, WEBP."`), which `AIChat.jsx` surfaces as the chat's error line.

---

## 2. AI Research Brief Generator

**Component:** `BriefGenerator` (inside `src/components/AITools/AITools.jsx`, first tab on `/ai-tools`).

**Endpoint:** `POST /api/ai` with `{ mode: "brief", business, industry, targetAudience, objective }`
(`business` or `industry` required; the other two are optional and get generic placeholder text if omitted).

```jsonc
// Request
{ "mode": "brief", "business": "Acme Foods", "industry": "Packaged snacks",
  "targetAudience": "Urban millennials", "objective": "evaluate demand before launch" }

// Response
{ "result": "MARKET RESEARCH BRIEF (draft)\n\n1. Background\n...", "mode": "live" }
```

**Live mode:** a single Claude call (model `claude-haiku-4-5`, `max_tokens: 900`) asked to produce a
plain-text brief with six numbered sections: Background, Research Objectives, Recommended Methodology, Key
Research Questions, Suggested Timeline, Deliverables.

**Demo mode:** `fallbackBrief()` fills the same six-section template directly from the form inputs (with
generic fallback phrases for anything left blank), so the output structure is identical between modes.

The result renders in a `ResultCard` with a one-click **Copy** button (`navigator.clipboard`).

---

## 3. AI Survey Question Generator

**Component:** `SurveyGenerator` (inside `src/components/AITools/AITools.jsx`, second tab on `/ai-tools`).

**Endpoint:** `POST /api/ai` with `{ mode: "survey", topic, audience, researchType }`
(`topic` required; `researchType` is `"quantitative"` (default) or `"qualitative"`).

**Live mode:** a single Claude call (`max_tokens: 900`) asked for 8–12 numbered, unbiased questions matching
the chosen methodology.

**Demo mode:** `fallbackSurvey()` picks from two hardcoded question banks (one quant, one qual — 6–7 questions
each) and substitutes the topic into each question's wording.

Also renders in a `ResultCard` with Copy support, same as the brief generator.

---

## 4. AI News Feed

**Component:** `src/components/News/News.jsx` — full page at `/ai-news`, linked in the header nav.

**Endpoint:** `GET /api/news?category=<key>` where `<key>` is one of `all` (default), `ai`, `technology`,
`startups`, `business`, `markets` (defined once in `src/lib/newsCategories.js`, consumed by both the frontend
filter pills and the backend's validation — an unrecognized/missing category silently falls back to `all`).

```jsonc
// GET /api/news?category=ai  →
{
  "mode": "live",
  "articles": [
    {
      "id": "https://example.com/article-1",
      "title": "AI startups raise record funding in Q3",
      "summary": "Venture investment in AI companies hit a new quarterly high.",
      "source": "Example News",
      "url": "https://example.com/article-1",
      "image": "https://example.com/image1.jpg",
      "publishedAt": "2026-09-11T12:00:00Z",
      "category": "ai"
    }
  ]
}
```

### Live mode (`NEWS_API_KEY` set)

`fetchFromNewsAPI()` calls NewsAPI.org's `/v2/everything` endpoint with a category-specific search query,
`sortBy: publishedAt`, `language: en`, `pageSize: 12`. Query strings per category (`CATEGORY_QUERIES` in
`api/news.js`):

| Category | Query |
|---|---|
| `all` | `artificial intelligence OR "machine learning" OR technology OR startup OR business OR markets` |
| `ai` | `artificial intelligence OR "machine learning" OR "generative AI" OR LLM OR chatbot` |
| `technology` | `technology OR software OR "tech industry" OR "consumer electronics"` |
| `startups` | `startup OR "venture capital" OR "funding round" OR "seed funding" OR unicorn` |
| `business` | `business OR corporate OR economy OR earnings OR "company news"` |
| `markets` | `"stock market" OR markets OR NASDAQ OR "S&P 500" OR shares OR trading` |

Articles titled `[Removed]` (NewsAPI's marker for a retracted/unavailable article) are filtered out. Missing
descriptions fall back to the article's own title.

**AI summarization (optional, needs `ANTHROPIC_API_KEY` too):** `summarizeWithAI()` makes **one** batched Claude
call per request — not one call per article — listing every fetched article's title + snippet and asking for a
JSON array of one-sentence (≤140 char) summaries in the same order. The response is parsed defensively (regex
extraction of the `[...]` array, array-length check against the input); on any failure it logs and returns the
original NewsAPI descriptions unchanged, so a bad AI response never breaks the feed.

### Demo mode (no `NEWS_API_KEY`)

12 hand-written, realistic-but-generic articles (`DEMO_ARTICLES_RAW`) spanning all five real categories, with
working links to reputable outlets' topic/category pages (e.g. TechCrunch's AI category, Reuters Markets) rather
than fabricated specific-article URLs. `getDemoArticles()` staggers each article's `publishedAt` timestamp 5
hours apart *relative to the current request time* (not a fixed date baked in at commit time), so the feed
always looks current no matter when it's viewed. Demo articles have `image: null` — no dependency on external
image hosting for the fallback path.

### Card rendering & missing/broken images

`NewsCard` shows a category badge, title (2-line clamp), summary (3-line clamp), source, relative publish date
(`"Just now"` / `"Xh ago"` / `"Xd ago"` / full date after 7 days — see `formatDate()`), and a "Read full
article" link (`target="_blank" rel="noopener noreferrer"`). If `article.image` is missing, **or** the `<img>`
fails to load (`onError`), the card falls back to a category-colored gradient with an icon — this covers both
demo mode (`image: null`) and live mode (NewsAPI frequently returns `null` or dead `urlToImage` URLs).

### UI states

- **Loading:** 6 pulsing skeleton cards, shown while `isLoading` is true.
- **Populated:** the article grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- **Empty:** shown when a category legitimately returns zero articles — icon, "No news found", suggests trying
  another filter.
- **Error:** shown on any non-2xx response or network failure — red banner with the server's error message and
  a **Try again** button that re-triggers the fetch.

Fetches use an `AbortController` (`useEffect` cleanup aborts the in-flight request when `category` changes
again before it resolves, or on unmount) so a slow, superseded request can never clobber the loading state set
by a newer one — a race that was caught and fixed during development (an aborted request's `catch` block
returns early *before* touching `isLoading`, rather than clearing it in a shared `finally`).

---

## File & dependency map

| File | Role |
|---|---|
| `api/ai.js` | Chat / brief / survey serverless function. Imports `@anthropic-ai/sdk`, `mammoth`, `src/lib/attachments.js`. |
| `api/news.js` | News feed serverless function. Imports `@anthropic-ai/sdk`, `src/lib/newsCategories.js`. Uses raw `fetch` for NewsAPI (no official SDK exists for it). |
| `src/lib/attachments.js` | Shared attachment type/size rules + client-side `validateFile()`. Used by `AIChat.jsx` and `api/ai.js`. |
| `src/lib/newsCategories.js` | Shared category key/label list. Used by `News.jsx` and `api/news.js`. |
| `src/components/AIChat/AIChat.jsx` | Chatbot widget UI, mounted in `src/Layout.jsx`. |
| `src/components/AITools/AITools.jsx` | Brief + survey generator UI (tabbed page at `/ai-tools`). |
| `src/components/News/News.jsx` | News feed UI (`/ai-news`). |
| `.env.example` | Documents both optional env vars; copy to `.env` for `vercel dev`. |

**npm dependencies added for these features** (see `package.json`): `@anthropic-ai/sdk` (official Anthropic
SDK — used instead of hand-rolled `fetch` calls, per Anthropic's own guidance, and because it's needed to build
correct multi-block image/document requests) and `mammoth` (DOCX → plain text extraction; pure JS, no native
bindings, safe under Vercel's Node serverless bundler).

## Running and testing locally

`vite dev` (i.e. `npm run dev`) serves the React app only — it does **not** execute `/api/*` serverless
functions, so the AI features will 404 against a plain dev server. To test them locally:

1. `npm install -g vercel` (one-time).
2. Copy `.env.example` to `.env` and optionally fill in your keys.
3. Run `vercel dev` instead of `npm run dev` — it serves both the Vite app and the `/api` functions together,
   matching production routing.

Without `vercel dev`, you can still test the serverless functions in isolation with plain Node, since they're
just `export default async function handler(req, res)` — e.g. `import handler from './api/ai.js'` in a small
script with a mock `req`/`res`.

## Vercel deployment notes

- No special project configuration is needed beyond what's already in this repo. Import the repo into Vercel
  with framework preset **Vite**, and deploy — `api/*.js` files are auto-detected as serverless functions.
- `vercel.json`'s rewrite (`/((?!api/).*)  →  /index.html`) is what makes this work: it sends every non-`/api`
  path to the SPA for client-side routing, while leaving `/api/*` alone to hit the functions.
- Set `ANTHROPIC_API_KEY` and/or `NEWS_API_KEY` under **Settings → Environment Variables**, then redeploy (env
  var changes require a new deployment to take effect).
- Both functions run on the default Node.js Serverless Functions runtime — not Edge — so `Buffer` and the full
  Node standard library are available.
- Remember the fixed **4.5 MB request body limit** on Vercel Serverless Functions if you ever raise the
  attachment size limits in `src/lib/attachments.js` — it's a platform limit, not something configurable in
  `vercel.json`.

## Known limitations

- **No persistence.** Chat history lives only in React state (lost on refresh); there's no database, so nothing
  is logged or stored server-side.
- **No caching layer.** Every news feed category switch triggers a fresh `/api/news` request (and, in live
  mode, a fresh NewsAPI call + Claude summarization call). Fine for a demo/portfolio traffic level; add caching
  (e.g. Vercel KV, or a short in-memory TTL) before scaling up.
- **NewsAPI free tier** is intended for development use; check NewsAPI's terms before relying on it for
  production traffic, and consider a paid plan or a different provider for a real launch.
- **No automated tests.** Feature correctness has been verified manually (direct handler invocation with mock
  `req`/`res`, and Playwright UI passes) during development, but there's no CI test suite in this repo yet.
- **Single fixed model** (`claude-haiku-4-5`) across all AI calls, chosen for cost/latency on lightweight
  Q&A/generation/summarization tasks — not configurable via env var today (see below for how to change it).

## Extending these features

- **Add a new `/api/ai` mode:** add an `if (mode === 'your-mode') { ... }` branch in the handler, following the
  existing pattern (validate input → live branch calling `callAnthropic()` → demo branch calling a
  `fallbackYourMode()` template function). No frontend routing changes needed beyond wiring up a new
  form/component that POSTs `{ mode: 'your-mode', ... }`.
- **Add a new news category:** add `{ key: '...', label: '...' }` to `NEWS_CATEGORIES` in
  `src/lib/newsCategories.js`, then add a matching entry to `CATEGORY_QUERIES` in `api/news.js` and (for demo
  mode) a few entries in `DEMO_ARTICLES_RAW` with that `category`. The frontend filter pills and validation
  pick up the new key automatically.
- **Change the model:** update `ANTHROPIC_MODEL` at the top of `api/ai.js` and/or `api/news.js`. Keep both in
  sync unless you deliberately want different models for chat/generation vs. news summarization.
- **Add a new attachment type:** add an entry to `ATTACHMENT_TYPES` in `src/lib/attachments.js` (extension,
  media type, `kind: 'image' | 'document'`), then add a handling branch in `buildAttachmentContent()`
  (`api/ai.js`) for how that type reaches Claude (native content block vs. server-side text extraction).
