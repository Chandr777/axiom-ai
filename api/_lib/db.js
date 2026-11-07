const base = process.env.SUPABASE_URL?.replace(/\/$/, '');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function call(path, options = {}) {
  if (!base || !key) {
    throw new Error('Supabase не настроен: задайте SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY в Vercel Environment Variables.');
  }
  const response = await fetch(`${base}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || data?.hint || `Supabase REST HTTP ${response.status}`);
  }
  return data;
}

const select = (table, query = '') => call(`${table}?select=*${query}`);

export async function loadMeasurementConfig(market = 'both') {
  const [brands, prompts, providers] = await Promise.all([
    select('tracked_brands', '&is_active=eq.true&order=name.asc'),
    select('test_prompts', '&is_active=eq.true&order=code.asc'),
    select('ai_providers', '&is_active=eq.true&order=id.asc'),
  ]);
  const selectedPrompts = (prompts || []).filter(
    (prompt) => market === 'both' || prompt.language === market,
  );
  if (!selectedPrompts.length) throw new Error('В Supabase не найдены активные промпты для выбранного рынка.');
  if (!brands?.length) throw new Error('В Supabase не найдены активные бренды.');
  if (!providers?.length) throw new Error('В Supabase не найдены активные AI-провайдеры.');
  return { brands, prompts: selectedPrompts, providers };
}

export async function createRun({ market, promptCount, providerIds }) {
  const config = {
    source: 'vercel',
    prompt_count: promptCount,
    provider_ids: providerIds,
  };
  const rows = await call('measurement_runs', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      panel_mode: 'both',
      market_scope: market,
      status: 'running',
      started_at: new Date().toISOString(),
      config,
    }),
  });
  if (!rows?.[0]?.id) throw new Error('Supabase не вернул ID запуска измерения.');
  return rows[0];
}

async function insertBatches(table, rows, batchSize = 400) {
  for (let index = 0; index < rows.length; index += batchSize) {
    await call(table, {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(rows.slice(index, index + batchSize)),
    });
  }
}

function citationDomain(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return null;
  }
}

export async function saveResults(runId, results, trackedBrands) {
  if (!results.length) return;
  const responseRows = results.map((result) => ({
    run_id: runId,
    prompt_id: result.prompt_id,
    provider_id: result.provider,
    model_name: result.model || null,
    response_text: result.answer || '',
    response_status: result.status,
    error_message: result.error || null,
    latency_ms: Math.max(0, Number(result.latency_ms) || 0),
  }));
  const savedResponses = await call('ai_responses', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(responseRows),
  });
  const responseByKey = new Map(
    (savedResponses || []).map((response) => [
      `${response.prompt_id}:${response.provider_id}`,
      response,
    ]),
  );
  const brandBySlug = new Map(trackedBrands.map((brand) => [brand.slug, brand]));
  const metricRows = [];
  const citationRows = [];

  for (const result of results) {
    const response = responseByKey.get(`${result.prompt_id}:${result.provider}`);
    if (!response) throw new Error('Supabase не вернул сохранённый AI response.');
    const positionByBrand = new Map(
      (result.position_order || []).map((slug, index) => [slug, index + 1]),
    );
    for (const item of result.brands || []) {
      const brand = brandBySlug.get(item.id);
      if (!brand) continue;
      metricRows.push({
        response_id: response.id,
        brand_id: brand.id,
        mention_count: item.mentioned ? 1 : 0,
        recommendation_count: item.recommended ? 1 : 0,
        citation_count: 0,
        first_mention_position: positionByBrand.get(item.id) || null,
        evidence: item.mentioned ? [{ type: 'brand_name_or_alias_match' }] : [],
      });
    }
    (result.citations || []).forEach((citation, index) => {
      if (!citation?.url) return;
      citationRows.push({
        response_id: response.id,
        url: citation.url,
        title: citation.title || citation.url,
        domain: citationDomain(citation.url),
        citation_position: index + 1,
      });
    });
  }

  await insertBatches('response_brand_metrics', metricRows);
  await insertBatches('response_citations', citationRows);
}

export async function finishRun(run, details) {
  const config = {
    ...(run.config || {}),
    successful_count: details.successful_count || 0,
    failed_count: details.failed_count || 0,
    duration_ms: details.duration_ms || 0,
  };
  await call(`measurement_runs?id=eq.${encodeURIComponent(run.id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      status: details.status,
      completed_at: new Date().toISOString(),
      config,
    }),
  });
}

export async function getDashboard() {
  const runs = await call('measurement_runs?select=*&order=created_at.desc&limit=20');
  const latestRun = runs?.[0] || null;
  const mappedRuns = (runs || []).map((run) => ({
    ...run,
    market: run.market_scope,
    successful_count: run.config?.successful_count || 0,
    failed_count: run.config?.failed_count || 0,
    duration_ms: run.config?.duration_ms || 0,
  }));
  if (!latestRun) return { runs: mappedRuns, results: [] };

  const [responses, prompts, brands] = await Promise.all([
    call(`ai_responses?select=*&run_id=eq.${encodeURIComponent(latestRun.id)}&order=created_at.asc&limit=1000`),
    select('test_prompts'),
    select('tracked_brands'),
  ]);
  if (!responses?.length) return { runs: mappedRuns, results: [] };

  const responseIds = responses.map((response) => response.id);
  const inFilter = `in.(${responseIds.join(',')})`;
  const [metrics, citations] = await Promise.all([
    call(`response_brand_metrics?select=*&response_id=${inFilter}&limit=12000`),
    call(`response_citations?select=*&response_id=${inFilter}&order=citation_position.asc&limit=12000`),
  ]);
  const promptById = new Map((prompts || []).map((prompt) => [prompt.id, prompt]));
  const brandById = new Map((brands || []).map((brand) => [brand.id, brand]));
  const metricsByResponse = new Map();
  const citationsByResponse = new Map();

  for (const metric of metrics || []) {
    const list = metricsByResponse.get(metric.response_id) || [];
    list.push(metric);
    metricsByResponse.set(metric.response_id, list);
  }
  for (const citation of citations || []) {
    const list = citationsByResponse.get(citation.response_id) || [];
    list.push(citation);
    citationsByResponse.set(citation.response_id, list);
  }

  const results = responses.map((response) => {
    const prompt = promptById.get(response.prompt_id);
    const responseMetrics = metricsByResponse.get(response.id) || [];
    const responseCitations = citationsByResponse.get(response.id) || [];
    const citedIds = new Set(responseCitations.map((citation) => citation.brand_id).filter(Boolean));
    const brandResults = responseMetrics.map((metric) => {
      const brand = brandById.get(metric.brand_id);
      if (!brand) return null;
      return {
        id: brand.slug,
        name: brand.name,
        mentioned: metric.mention_count > 0,
        cited: citedIds.has(brand.id),
        recommended: metric.recommendation_count > 0,
      };
    }).filter(Boolean);
    const positionOrder = responseMetrics
      .filter((metric) => metric.first_mention_position != null)
      .sort((a, b) => a.first_mention_position - b.first_mention_position)
      .map((metric) => brandById.get(metric.brand_id)?.slug)
      .filter(Boolean);
    return {
      id: response.id,
      run_id: response.run_id,
      prompt_id: prompt?.code || response.prompt_id,
      locale: prompt?.language || 'ru',
      category: prompt?.category || '',
      prompt: prompt?.prompt_text || '',
      provider: response.provider_id,
      model: response.model_name,
      answer: response.response_text || '',
      citations: responseCitations.map(({ url, title, brand_id }) => ({ url, title, brand_id })),
      brands: brandResults,
      position_order: positionOrder,
      latency_ms: response.latency_ms,
      status: response.response_status,
      error: response.error_message,
    };
  });

  return { runs: mappedRuns, results };
}
