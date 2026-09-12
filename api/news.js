// Vercel serverless function: /api/news
// Powers the "AI News" feed section. Fetches recent AI/technology/business
// news from NewsAPI.org (https://newsapi.org) when NEWS_API_KEY is
// configured; otherwise falls back to a curated static demo feed so the
// section works immediately in any deployment — same live/demo pattern as
// api/ai.js. When ANTHROPIC_API_KEY is also configured, article summaries
// are condensed with a single batched Claude call.

import Anthropic from '@anthropic-ai/sdk';
import { NEWS_CATEGORY_KEYS } from '../src/lib/newsCategories.js';

const ANTHROPIC_MODEL = 'claude-haiku-4-5';
const PAGE_SIZE = 12;

const CATEGORY_QUERIES = {
  all: '(artificial intelligence OR "machine learning" OR technology OR startup OR business OR markets)',
  ai: '(artificial intelligence OR "machine learning" OR "generative AI" OR LLM OR chatbot)',
  technology: '(technology OR software OR "tech industry" OR "consumer electronics")',
  startups: '(startup OR "venture capital" OR "funding round" OR "seed funding" OR unicorn)',
  business: '(business OR corporate OR economy OR earnings OR "company news")',
  markets: '("stock market" OR markets OR NASDAQ OR "S&P 500" OR shares OR trading)',
};

function clean(str, fallback = '') {
  return typeof str === 'string' ? str.trim().slice(0, 400) : fallback;
}

// ---------- Live mode: NewsAPI ----------

async function fetchFromNewsAPI(apiKey, category) {
  const q = CATEGORY_QUERIES[category] || CATEGORY_QUERIES.all;
  const params = new URLSearchParams({
    q,
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: String(PAGE_SIZE),
    apiKey,
  });

  const response = await fetch(`https://newsapi.org/v2/everything?${params.toString()}`);
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`NewsAPI error ${response.status}: ${body}`);
  }

  const data = await response.json();
  return (data.articles || [])
    .filter((a) => a && a.title && a.url && a.title !== '[Removed]')
    .map((a) => ({
      id: a.url,
      title: clean(a.title, 'Untitled'),
      summary: clean(a.description, '') || clean(a.title, ''),
      source: clean(a.source && a.source.name, 'Unknown source'),
      url: a.url,
      image: a.urlToImage || null,
      publishedAt: a.publishedAt || null,
      category,
    }));
}

// Batches all fetched articles into a single Claude call that returns a
// concise one-sentence summary per article, in order. Falls back to the
// original NewsAPI descriptions if the key is missing or anything goes
// wrong parsing the response — summaries are "nice to have", not required.
async function summarizeWithAI(apiKey, articles) {
  if (!apiKey || articles.length === 0) return articles;

  try {
    const client = new Anthropic({ apiKey });
    const listing = articles
      .map((a, i) => `${i + 1}. Title: ${a.title}\nSnippet: ${a.summary || '(none)'}`)
      .join('\n\n');

    const response = await client.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: 900,
      system:
        'You write concise, neutral one-sentence news summaries (max 140 characters each). Respond with ONLY a ' +
        'JSON array of strings, same order as the input, no other text and no markdown formatting.',
      messages: [
        {
          role: 'user',
          content: `Summarize each of these ${articles.length} news items in one sentence:\n\n${listing}`,
        },
      ],
    });

    const text = (response.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text);

    if (Array.isArray(parsed) && parsed.length === articles.length) {
      return articles.map((a, i) => {
        const summary = clean(parsed[i], '');
        return summary ? { ...a, summary } : a;
      });
    }
  } catch (err) {
    console.error('AI news summarization failed, using original summaries:', err);
  }

  return articles;
}

// ---------- Demo mode (no NEWS_API_KEY) ----------

const DEMO_ARTICLES_RAW = [
  {
    category: 'ai',
    title: 'Enterprises accelerate generative AI adoption across core business functions',
    summary:
      'A growing share of large companies now run generative AI pilots beyond IT — in customer service, marketing and finance — as tooling matures.',
    source: 'TechCrunch',
    url: 'https://techcrunch.com/category/artificial-intelligence/',
  },
  {
    category: 'ai',
    title: 'New multimodal AI models push closer to real-time video understanding',
    summary:
      'Research labs report progress on models that can reason about live video streams, opening applications in safety monitoring and robotics.',
    source: 'The Verge',
    url: 'https://www.theverge.com/ai-artificial-intelligence',
  },
  {
    category: 'ai',
    title: 'Regulators outline new guidance for AI transparency in consumer products',
    summary: 'Draft guidelines would require clearer disclosure when AI systems are used in customer-facing decisions.',
    source: 'Reuters',
    url: 'https://www.reuters.com/technology/',
  },
  {
    category: 'technology',
    title: 'Cloud providers report rising demand for AI-optimized computing capacity',
    summary: 'Major cloud vendors are expanding data center capacity as customers scale up AI training and inference workloads.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/technology/',
  },
  {
    category: 'technology',
    title: 'Chipmakers unveil next-generation processors aimed at edge AI devices',
    summary: 'New low-power chips target on-device AI features for phones, wearables and IoT hardware.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/technology',
  },
  {
    category: 'technology',
    title: 'Software firms roll out AI copilots for everyday productivity tools',
    summary: 'AI-assisted writing, coding and spreadsheet features are becoming standard across mainstream office software.',
    source: 'The Wall Street Journal',
    url: 'https://www.wsj.com/tech',
  },
  {
    category: 'startups',
    title: 'Early-stage AI startups draw fresh venture funding despite tighter markets',
    summary: 'Investors continue backing applied-AI startups in healthcare, legal and logistics, even as overall VC funding cools.',
    source: 'TechCrunch',
    url: 'https://techcrunch.com/category/startups/',
  },
  {
    category: 'startups',
    title: 'Accelerator programs report record applications from AI-focused founders',
    summary: 'This year\'s cohorts skew heavily toward applied-AI and developer-tooling startups, program directors say.',
    source: 'Forbes',
    url: 'https://www.forbes.com/ai/',
  },
  {
    category: 'business',
    title: 'Retailers pilot AI-driven demand forecasting ahead of the holiday season',
    summary: 'Large retail chains are testing machine-learning forecasting tools to reduce stockouts and overstock.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/business/',
  },
  {
    category: 'business',
    title: 'Manufacturers report productivity gains from AI-assisted quality control',
    summary: 'Computer-vision inspection systems are cutting defect rates on production lines, according to industry surveys.',
    source: 'Financial Times',
    url: 'https://www.ft.com/artificial-intelligence',
  },
  {
    category: 'markets',
    title: 'Tech shares mixed as investors weigh AI spending against near-term earnings',
    summary: 'Markets remain split on whether heavy AI infrastructure spending will pay off in the next few quarters.',
    source: 'Reuters',
    url: 'https://www.reuters.com/markets/',
  },
  {
    category: 'markets',
    title: 'Analysts raise long-term forecasts for AI infrastructure spending',
    summary: 'Several research firms revised upward their multi-year projections for enterprise AI infrastructure investment.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/markets',
  },
];

function getDemoArticles(category) {
  const now = Date.now();
  const list = DEMO_ARTICLES_RAW
    // Stagger fake publish times a few hours apart, most recent first, so
    // the feed always looks current relative to whenever it's viewed.
    .map((a, i) => ({
      ...a,
      id: a.url + '#' + i,
      image: null,
      publishedAt: new Date(now - i * 5 * 3600 * 1000).toISOString(),
    }));

  return category === 'all' ? list : list.filter((a) => a.category === category);
}

// ---------- Handler ----------

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const requested = Array.isArray(req.query.category) ? req.query.category[0] : req.query.category;
  const category = NEWS_CATEGORY_KEYS.includes(requested) ? requested : 'all';

  const newsApiKey = process.env.NEWS_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  try {
    if (newsApiKey) {
      const articles = await fetchFromNewsAPI(newsApiKey, category);
      const summarized = await summarizeWithAI(anthropicKey, articles);
      res.status(200).json({ articles: summarized, mode: 'live' });
      return;
    }

    res.status(200).json({ articles: getDemoArticles(category), mode: 'demo' });
  } catch (err) {
    console.error('News endpoint error:', err);
    res.status(502).json({ error: 'Unable to fetch news right now. Please try again shortly.' });
  }
}
