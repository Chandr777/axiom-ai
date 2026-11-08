import { runMonitoring } from '../_lib/sov.js';
import { createRun, finishRun, loadMeasurementConfig, saveResults } from '../_lib/db.js';
import { authorized } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const market = ['ru', 'en'].includes(req.body?.market) ? req.body.market : 'both';
  let run;
  const started = Date.now();

  try {
    const config = await loadMeasurementConfig(market);
    const enabledProviderIds = config.providers.map((provider) => provider.id);
    const availableProviderIds = enabledProviderIds.filter((id) => {
      if (id === 'chatgpt') return !!process.env.OPENAI_API_KEY && (process.env.OPENAI_MODEL || 'gpt-6-astra') === 'gpt-6-astra';
      if (id === 'claude') return !!process.env.ANTHROPIC_API_KEY && (process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6') === 'claude-sonnet-4-6';
      if (id === 'perplexity') return !!process.env.PERPLEXITY_API_KEY && process.env.PERPLEXITY_COST_TRACKING_ENABLED === 'true';
      return false;
    });
    if (!availableProviderIds.length) {
      throw new Error('Нет API-ключей активных AI-провайдеров. Сначала проверьте модели и бюджет, затем добавьте ключи в Vercel Environment Variables.');
    }

    run = await createRun({
      market,
      promptCount: config.prompts.length,
      providerIds: availableProviderIds,
    });

    const output = await runMonitoring({
      market,
      prompts: config.prompts,
      brands: config.brands,
      activeProviders: availableProviderIds,
    });
    await saveResults(run.id, output.results, config.brands);
    await finishRun(run, {
      status: output.failed_count === output.results.length ? 'failed' : 'completed',
      successful_count: output.successful_count,
      failed_count: output.failed_count,
      duration_ms: Date.now() - started,
      cost_summary: {
        budget_usd: output.budget_usd,
        total_cost_usd: output.total_cost_usd,
        cost_by_provider: output.cost_by_provider,
        budget_reached: output.budget_reached,
        cost_unknown: output.cost_unknown,
        planned_request_count: output.planned_request_count,
        completed_request_count: output.completed_request_count,
      },
      partial: output.stopped_early || output.completed_request_count < output.planned_request_count,
    });

    return res.status(200).json({ runId: run.id, ...output });
  } catch (error) {
    if (run?.id) {
      await finishRun(run, {
        status: 'failed',
        successful_count: 0,
        failed_count: 0,
        duration_ms: Date.now() - started,
      }).catch(() => {});
    }
    return res.status(500).json({ error: error.message || 'Run failed' });
  }
}
