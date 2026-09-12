# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## AI Features

This site includes four AI-powered features. The chat/brief/survey tools share one Vercel serverless function
(`api/ai.js`); the news feed has its own (`api/news.js`). This section is a quick overview — see
**[AI_FEATURES.md](./AI_FEATURES.md)** for the full technical reference (request/response shapes, exact limits,
demo-mode fallback behavior, and how to extend each feature).

- **AI Chatbot** (floating widget, bottom-right on every page) — answers visitor questions about IMRI's services,
  and can analyze uploaded files/images (see below).
- **AI Research Brief Generator** (`/ai-tools`) — drafts a market research brief from a short business description.
- **AI Survey Question Generator** (`/ai-tools`) — drafts a survey/interview questionnaire for a given topic.
- **AI News Feed** (`/ai-news`) — a filterable feed of recent AI/technology/startup/business/market headlines.

### AI News Feed

`/ai-news` fetches headlines via [NewsAPI.org](https://newsapi.org) when `NEWS_API_KEY` is set, filtered server-side
by category (All, AI, Technology, Startups, Business, Markets — the pills above the feed). Each card shows an
image (falls back to a category-colored icon if missing or broken), title, summary, source, publish date, and a
link to the original article. When `ANTHROPIC_API_KEY` is also set, article summaries are condensed to one
sentence each via a single batched Claude call; otherwise the source's own description is used as-is. Without
`NEWS_API_KEY`, the feed falls back to a small curated demo dataset (same live/demo pattern as `api/ai.js`) so the
page always has something to show. The page also has its own loading (skeleton cards), empty, and error (with
retry) states.

### Chatbot file & image uploads

The chatbot's attach button (paperclip icon) accepts PDF, DOCX, TXT, CSV, JPG, PNG and WEBP files — up to 4 files
and 3 MB per message combined. Images are sent to Claude's vision input for direct analysis; PDFs are sent as
native documents; DOCX/TXT/CSV are text-extracted server-side (via `mammoth` for DOCX) and passed to the model as
context. Limits are sized to stay under Vercel's fixed 4.5 MB Serverless Function request-body cap. In demo mode
(no API key), the bot acknowledges attached files but can't analyze them until `ANTHROPIC_API_KEY` is set.

### Enabling live AI responses

By default (no API key configured) these features run in a **demo mode** using built-in rule-based
responses, so they work immediately after deployment. To enable real generative AI responses:

1. Get an API key from [console.anthropic.com](https://console.anthropic.com).
2. In your Vercel project, go to **Settings → Environment Variables** and add:
   - `ANTHROPIC_API_KEY` = your key
   - `NEWS_API_KEY` = your key from [newsapi.org](https://newsapi.org/register) (optional — enables live headlines
     for the AI News Feed; the feed works without it, using demo data)
3. Redeploy. The `/api/ai` and `/api/news` functions automatically switch to live responses once the relevant key
   is present.

For local development with the API route, copy `.env.example` to `.env` and run `vercel dev` (the Vercel CLI)
instead of `vite dev`, since `vite dev` alone does not execute the `/api` serverless functions.

### Deploying to Vercel

This is a standard Vite SPA with a serverless `/api` function — no special configuration needed beyond the
`vercel.json` already in this repo, which routes `/api/*` to the serverless function and everything else to
the SPA. Just import the repo into Vercel (framework preset: Vite) and deploy.
