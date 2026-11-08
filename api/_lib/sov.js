import { BRANDS } from './prompts.js';

const timeout = () => AbortSignal.timeout(Number(process.env.SOV_REQUEST_TIMEOUT_MS || 45000));
const usdPerMillion = (tokens, rate) => (Number(tokens || 0) * rate) / 1_000_000;
const roundCost = (value) => Number(value.toFixed(8));

async function post(url, key, body, extra = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json', ...extra },
    body: JSON.stringify(body),
    signal: timeout(),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error?.message || data?.message || `HTTP ${response.status}`);
  return data;
}

const outText = (data) => data.output_text || (data.output || [])
  .flatMap((item) => item.content || [])
  .filter((item) => ['output_text', 'text'].includes(item.type))
  .map((item) => item.text || '')
  .join('\n');

async function openai(prompt) {
  const model = process.env.OPENAI_MODEL || 'gpt-6-astra';
  const data = await post(
    'https://api.openai.com/v1/responses',
    process.env.OPENAI_API_KEY,
    {
      model,
      tools: [{ type: 'web_search', search_context_size: 'low' }],
      tool_choice: 'required',
      max_tool_calls: 1,
      max_output_tokens: 1200,
      input: `Search the live web and answer independently. List only providers you can substantiate. Answer in the language of the question and include source links.\n\n${prompt}`,
    },
  );
  const citations = (data.output || [])
    .flatMap((item) => item.content || [])
    .flatMap((item) => item.annotations || [])
    .filter((item) => item.url)
    .map((item) => ({ url: item.url, title: item.title || item.url }));
  const usage = data.usage || {};
  const searchCalls = (data.output || []).filter((item) => item.type === 'web_search_call').length;
  const costUsd = usdPerMillion(usage.input_tokens, 10) + usdPerMillion(usage.output_tokens, 50) + searchCalls * 0.01 / 1000;
  return { text: outText(data), citations, model: data.model || model, usage, cost_usd: roundCost(costUsd) };
}

async function claude(prompt) {
  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
  const data = await post(
    'https://api.anthropic.com/v1/messages',
    process.env.ANTHROPIC_API_KEY,
    {
      model,
      max_tokens: 1200,
      system: 'Research current providers using web search. Be independent, substantiate claims, answer in the question language and cite sources.',
      messages: [{ role: 'user', content: prompt }],
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 1 }],
    },
    { 'anthropic-version': '2023-06-01', 'x-api-key': process.env.ANTHROPIC_API_KEY },
  );
  const blocks = data.content || [];
  return {
    text: blocks.filter((item) => item.type === 'text').map((item) => item.text).join('\n'),
    citations: blocks.flatMap((item) => item.citations || [])
      .filter((item) => item.url)
      .map((item) => ({ url: item.url, title: item.title || item.url })),
    model: data.model || model,
    usage: data.usage || {},
    cost_usd: roundCost(
      usdPerMillion(data.usage?.input_tokens, 3)
      + usdPerMillion(data.usage?.output_tokens, 15)
      + Number(data.usage?.server_tool_use?.web_search_requests || 0) * 0.01 / 1000
    ),
  };
}

async function perplexity(prompt) {
  const preset = process.env.PERPLEXITY_PRESET || 'pro-search';
  const data = await post(
    'https://api.perplexity.ai/v1/agent',
    process.env.PERPLEXITY_API_KEY,
    {
      preset,
      input: `Research current providers independently. Answer in the question language and cite sources.\n\n${prompt}`,
    },
  );
  const citations = (data.citations || [])
    .map((item) => typeof item === 'string' ? { url: item, title: item } : { url: item.url, title: item.title || item.url })
    .filter((item) => item.url);
  return {
    text: outText(data), citations, model: data.model || preset,
    usage: data.usage || {},
    cost_usd: Number.isFinite(Number(data.usage?.cost_usd)) ? roundCost(Number(data.usage.cost_usd)) : null,
  };
}

const providers = [
  { id: 'chatgpt', enabled: () => !!process.env.OPENAI_API_KEY, run: openai },
  { id: 'claude', enabled: () => !!process.env.ANTHROPIC_API_KEY, run: claude },
  { id: 'perplexity', enabled: () => !!process.env.PERPLEXITY_API_KEY, run: perplexity },
];

const aliasesBySlug = new Map(BRANDS.map((brand) => [brand.id, brand.aliases]));

function analyze(text, citations, trackedBrands) {
  const normalizedText = (text || '').toLocaleLowerCase();
  const brands = trackedBrands.map((brand) => {
    const aliases = [
      brand.name,
      brand.slug,
      brand.domain,
      ...(aliasesBySlug.get(brand.slug) || []),
    ].filter(Boolean);
    const hits = [...new Set(aliases)]
      .map((alias) => normalizedText.indexOf(alias.toLocaleLowerCase()))
      .filter((index) => index >= 0)
      .sort((a, b) => a - b);
    const cited = citations.some((citation) => {
      try {
        const host = new URL(citation.url).hostname.toLowerCase().replace(/^www\./, '');
        return host === brand.domain.toLowerCase().replace(/^www\./, '');
      } catch {
        return false;
      }
    });
    const recommended = hits.length > 0 && /(recommend|suggest|consider|shortlist|best|hire|рекоменд|совету|подход|выбрать|обратиться)/i
      .test(text.slice(Math.max(0, hits[0] - 120), hits[0] + 240));
    return { id: brand.slug, name: brand.name, mentioned: hits.length > 0, cited, recommended, index: hits[0] ?? -1 };
  });
  return {
    brands: brands.map(({ index, ...brand }) => brand),
    position_order: brands.filter((brand) => brand.mentioned)
      .sort((a, b) => a.index - b.index)
      .map((brand) => brand.id),
  };
}


export async function runMonitoring({ market = 'both', prompts = [], brands = [], activeProviders = [] } = {}) {
  const selectedPrompts = prompts.filter((prompt) => market === 'both' || prompt.language === market);
  const selectedProviders = providers.filter(
    (provider) => provider.enabled() && activeProviders.includes(provider.id),
  );
  if (!selectedPrompts.length) throw new Error('Нет активных промптов для выбранного рынка в Supabase.');
  if (!brands.length) throw new Error('Нет активных брендов в Supabase.');
  if (!selectedProviders.length) {
    throw new Error('Нет подключённых AI API-ключей среди активных провайдеров. Добавьте ключи в Vercel Environment Variables после проверки моделей и бюджета.');
  }

  const budgetUsd = Math.max(0.01, Number(process.env.SOV_BUDGET_USD || 5));
  const started = Date.now();
  const tasks = selectedPrompts.flatMap((prompt) => selectedProviders.map((provider) => ({ prompt, provider })));
  const results = [];
  const costByProvider = {};
  let totalCostUsd = 0;
  let costUnknown = false;
  let budgetReached = false;

  for (const { prompt, provider } of tasks) {
    if (budgetReached || costUnknown) break;
    const taskStarted = Date.now();
    try {
      const answer = await provider.run(prompt.prompt_text);
      const citations = answer.citations || [];
      const analysis = analyze(answer.text, citations, brands);
      const costUsd = Number.isFinite(answer.cost_usd) ? answer.cost_usd : null;
      if (costUsd == null) costUnknown = true;
      else {
        totalCostUsd += costUsd;
        costByProvider[provider.id] = roundCost((costByProvider[provider.id] || 0) + costUsd);
      }
      results.push({
        prompt_id: prompt.id,
        prompt_code: prompt.code,
        locale: prompt.language,
        category: prompt.category,
        provider: provider.id,
        model: answer.model,
        prompt: prompt.prompt_text,
        answer: answer.text || '',
        citations,
        brands: analysis.brands,
        position_order: analysis.position_order,
        latency_ms: Date.now() - taskStarted,
        status: 'success',
        error: null,
        usage: answer.usage || {},
        cost_usd: costUsd,
      });
      if (totalCostUsd >= budgetUsd) budgetReached = true;
    } catch (error) {
      results.push({
        prompt_id: prompt.id,
        prompt_code: prompt.code,
        locale: prompt.language,
        category: prompt.category,
        provider: provider.id,
        model: null,
        prompt: prompt.prompt_text,
        answer: '',
        citations: [],
        brands: brands.map((brand) => ({
          id: brand.slug,
          name: brand.name,
          mentioned: false,
          cited: false,
          recommended: false,
        })),
        position_order: [],
        latency_ms: Date.now() - taskStarted,
        status: 'error',
        error: error.message || 'Provider request failed',
        usage: {},
        cost_usd: null,
      });
    }
  }

  return {
    results,
    duration_ms: Date.now() - started,
    prompt_count: selectedPrompts.length,
    provider_count: selectedProviders.length,
    planned_request_count: tasks.length,
    completed_request_count: results.length,
    successful_count: results.filter((result) => result.status === 'success').length,
    failed_count: results.filter((result) => result.status === 'error').length,
    budget_usd: budgetUsd,
    total_cost_usd: roundCost(totalCostUsd),
    cost_by_provider: costByProvider,
    budget_reached: budgetReached,
    cost_unknown: costUnknown,
    stopped_early: budgetReached || costUnknown,
  };
}
