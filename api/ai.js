// Vercel serverless function: /api/ai
// Powers three AI features for the IMRI site:
//   mode "chat"   -> AI chatbot answers about IMRI's services
//   mode "brief"  -> AI-generated market research brief/proposal
//   mode "survey" -> AI-generated survey questionnaire
//
// Uses the Anthropic Messages API when ANTHROPIC_API_KEY is configured in the
// Vercel project's environment variables. Falls back to a deterministic,
// rule-based generator when no key is set, so the features work out of the
// box in a demo/preview deployment too.

const ANTHROPIC_MODEL = 'claude-haiku-4-5-20251001';

const COMPANY_CONTEXT = `You are the AI assistant for Intact Market Research India Pvt. Ltd. (IMRI / "Intact Research"),
an independent market research agency founded in 2015, headquartered at 3rd Floor, D-2, Railway Road Samaipur,
Yadav Nagar, New Delhi, 110042. Contact: harish.arya@intactresearch.org, +91-9871155332.

Services offered: Qualitative Research (focus groups, in-depth interviews, ethnographic studies, online communities),
Quantitative Research (online/telephone/face-to-face surveys, statistical analysis), Social Research (community
studies, public opinion polls, demographic analysis), Analytics (data mining, predictive analytics, BI, dashboards),
Business Research (market analysis, competitive intelligence, strategic planning), Consulting (market entry
strategy, brand positioning, customer journey mapping), and Traffic Research (Classified Traffic Volume Counts,
VVD surveys, Origin-Destination surveys, intersection counts, speed & delay studies, parking behavior studies,
pedestrian & bicycle counts). IMRI also runs an online panel across 65+ countries and has fieldwork capability
across 100+ Indian cities.

Answer questions concisely (2-5 sentences), in a helpful, professional tone, and steer users toward requesting a
quote via the Contact page when relevant. If asked something unrelated to market research or IMRI, answer briefly
and helpfully but bring the conversation back to how IMRI could help.`;

async function callAnthropic(apiKey, system, messages, maxTokens = 700) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Anthropic API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return (data.content || [])
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim();
}

function clean(str, fallback = '') {
  return typeof str === 'string' ? str.trim().slice(0, 2000) : fallback;
}

// ---------- Fallback (no API key) generators ----------

function fallbackChat(userMessage) {
  const msg = userMessage.toLowerCase();
  const faq = [
    {
      keys: ['qualitative'],
      reply:
        'Our Qualitative Research services include focus group discussions, in-depth interviews, ethnographic studies and online communities to uncover the "why" behind consumer behavior.',
    },
    {
      keys: ['quantitative', 'survey', 'poll'],
      reply:
        'For Quantitative Research we run online, telephone and face-to-face surveys with statistical analysis to give you measurable, representative insights.',
    },
    {
      keys: ['traffic'],
      reply:
        'Our Traffic Research suite covers Classified Traffic Volume Counts, 24-hour VVD surveys, Origin-Destination studies, intersection turning-movement counts, speed & delay studies and parking behavior studies for planners and infrastructure stakeholders.',
    },
    {
      keys: ['analytic', 'data', 'dashboard'],
      reply:
        'Our Analytics team turns raw research data into actionable insight through data mining, predictive analytics, business intelligence and custom dashboards.',
    },
    {
      keys: ['contact', 'reach', 'email', 'phone', 'call'],
      reply:
        'You can reach IMRI at harish.arya@intactresearch.org or +91-9871155332, or use the Contact page form and our team will respond within 24 hours.',
    },
    {
      keys: ['price', 'cost', 'quote', 'quotation'],
      reply:
        'Pricing depends on scope, sample size and methodology. The fastest way to get an accurate quote is via the "Get Quote" button or the Contact page — our team typically responds within 24 hours.',
    },
    {
      keys: ['about', 'who are you', 'company', 'history', 'founded'],
      reply:
        'Intact Market Research India Pvt. Ltd. was founded in 2015 and is a leading independent market research agency in India, with fieldwork capability across 100+ cities and an online panel spanning 65+ countries.',
    },
    {
      keys: ['service', 'offer', 'what do you do'],
      reply:
        'IMRI offers Qualitative Research, Quantitative Research, Social Research, Analytics, Business Research, Consulting and Traffic Research — see the Services page for the full list.',
    },
  ];

  const hit = faq.find((entry) => entry.keys.some((k) => msg.includes(k)));
  if (hit) return hit.reply;

  return (
    "Thanks for your question! I'm the IMRI assistant — I can help with our Qualitative, Quantitative, Social, " +
    'Analytics, Business Research, Consulting and Traffic Research services. Could you tell me a bit more about ' +
    'what you\'re looking for, or head to the Contact page and our research team will get back to you within 24 hours?'
  );
}

function fallbackBrief({ business, industry, targetAudience, objective }) {
  const biz = business || 'your business';
  const ind = industry || 'your industry';
  const audience = targetAudience || 'your target customers';
  const obj = objective || 'understand market opportunity and inform strategic decisions';

  return `MARKET RESEARCH BRIEF (draft)

1. Background
${biz} operates in the ${ind} sector and is seeking research support to ${obj}.

2. Research Objectives
- Understand needs, preferences and pain points of ${audience}
- Assess market size, competitive landscape and positioning opportunities within ${ind}
- Generate actionable recommendations to ${obj}

3. Recommended Methodology
- Qualitative phase: 4-6 in-depth interviews / 2 focus group discussions with ${audience} to explore attitudes and language
- Quantitative phase: online/telephone survey (n=300-500) with ${audience} for statistically robust measurement
- Secondary research: desk review of ${ind} industry reports and competitor benchmarking

4. Key Research Questions
- What are the top 3 decision drivers for ${audience} in ${ind}?
- How does ${biz} compare with competitors on awareness, consideration and preference?
- What price/value trade-offs matter most to ${audience}?
- What unmet needs represent the biggest growth opportunity for ${biz}?

5. Suggested Timeline
Weeks 1-2: Design & fieldwork preparation | Weeks 3-5: Data collection | Weeks 6-7: Analysis & reporting

6. Deliverables
Topline report, detailed findings deck with recommendations, and raw data tables.

(This is an auto-generated draft. Contact IMRI at harish.arya@intactresearch.org or +91-9871155332 to refine scope, sample size and pricing.)`;
}

function fallbackSurvey({ topic, audience, researchType }) {
  const t = topic || 'your product or service';
  const aud = audience || 'respondents';
  const type = (researchType || 'quantitative').toLowerCase();

  const quantQuestions = [
    `Thinking about "${t}" — on a scale of 1-10, how satisfied are you overall?`,
    `How likely are you to recommend this to a friend or colleague? (0-10 NPS scale)`,
    `How frequently are you engaged with this? (Daily / Weekly / Monthly / Rarely / Never)`,
    `Which factor influences you most here? (Price / Quality / Brand trust / Convenience / Other)`,
    `How does this compare to alternatives you've used? (Much better / Somewhat better / About the same / Worse)`,
    `What is your age group? (18-24 / 25-34 / 35-44 / 45-54 / 55+)`,
    `What is the single biggest improvement you'd like to see, regarding "${t}"?`,
  ];

  const qualQuestions = [
    `Can you walk me through the last time you used or considered ${t}?`,
    `What was going through your mind when you first learned about ${t}?`,
    `What almost stopped you from choosing ${t}?`,
    `How would you describe ${t} to a friend who has never heard of it?`,
    `What would make this an "easy yes" for you next time?`,
    `Tell me about a time this exceeded — or fell short of — your expectations, regarding "${t}".`,
  ];

  const list = type.includes('qual') ? qualQuestions : quantQuestions;
  const header = `SURVEY QUESTIONNAIRE (draft)\nTopic: ${t}\nTarget audience: ${aud}\nMethodology: ${type.includes('qual') ? 'Qualitative (interview guide)' : 'Quantitative (structured survey)'}\n`;
  return header + '\n' + list.map((q, i) => `${i + 1}. ${q}`).join('\n') +
    '\n\n(This is an auto-generated draft. IMRI can refine question wording, add screening/skip logic, and field this survey for you — contact harish.arya@intactresearch.org.)';
}

// ---------- Handler ----------

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  const mode = body.mode;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  try {
    if (mode === 'chat') {
      const incoming = Array.isArray(body.messages) ? body.messages : [];
      const messages = incoming
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-12)
        .map((m) => ({ role: m.role, content: clean(m.content, '') }));

      if (messages.length === 0) {
        res.status(400).json({ error: 'messages array is required' });
        return;
      }

      if (apiKey) {
        const reply = await callAnthropic(apiKey, COMPANY_CONTEXT, messages, 500);
        res.status(200).json({ result: reply, mode: 'live' });
        return;
      }

      const lastUser = [...messages].reverse().find((m) => m.role === 'user');
      res.status(200).json({ result: fallbackChat(lastUser ? lastUser.content : ''), mode: 'demo' });
      return;
    }

    if (mode === 'brief') {
      const payload = {
        business: clean(body.business),
        industry: clean(body.industry),
        targetAudience: clean(body.targetAudience),
        objective: clean(body.objective),
      };

      if (!payload.business && !payload.industry) {
        res.status(400).json({ error: 'business and industry are required' });
        return;
      }

      if (apiKey) {
        const prompt = `Generate a concise, well-structured market research brief for a client with these details:
Business: ${payload.business || 'N/A'}
Industry: ${payload.industry || 'N/A'}
Target audience: ${payload.targetAudience || 'N/A'}
Objective: ${payload.objective || 'N/A'}

Structure the brief with these sections: Background, Research Objectives, Recommended Methodology (mix of
qualitative and quantitative as appropriate), Key Research Questions, Suggested Timeline, Deliverables. Keep it
practical and specific to the business described. Plain text, no markdown headers, use numbered sections.`;
        const reply = await callAnthropic(
          apiKey,
          COMPANY_CONTEXT + '\n\nYou are drafting a market research brief for a prospective client.',
          [{ role: 'user', content: prompt }],
          900
        );
        res.status(200).json({ result: reply, mode: 'live' });
        return;
      }

      res.status(200).json({ result: fallbackBrief(payload), mode: 'demo' });
      return;
    }

    if (mode === 'survey') {
      const payload = {
        topic: clean(body.topic),
        audience: clean(body.audience),
        researchType: clean(body.researchType) || 'quantitative',
      };

      if (!payload.topic) {
        res.status(400).json({ error: 'topic is required' });
        return;
      }

      if (apiKey) {
        const prompt = `Generate a ${payload.researchType} survey/interview questionnaire (8-12 questions) for market
research on this topic: "${payload.topic}". Target audience: ${payload.audience || 'general consumers'}.
Number each question. Keep questions unbiased, clear, and appropriate for the ${payload.researchType} methodology.
Plain text output only, no markdown.`;
        const reply = await callAnthropic(
          apiKey,
          COMPANY_CONTEXT + '\n\nYou are drafting a survey questionnaire for a market research project.',
          [{ role: 'user', content: prompt }],
          900
        );
        res.status(200).json({ result: reply, mode: 'live' });
        return;
      }

      res.status(200).json({ result: fallbackSurvey(payload), mode: 'demo' });
      return;
    }

    res.status(400).json({ error: 'Invalid or missing "mode". Use "chat", "brief" or "survey".' });
  } catch (err) {
    console.error('AI endpoint error:', err);
    res.status(502).json({ error: 'AI service temporarily unavailable. Please try again shortly.' });
  }
}
