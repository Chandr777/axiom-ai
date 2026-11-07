import { runMonitoring } from '../_lib/sov.js';
import { createRun, finishRun, loadMeasurementConfig, saveResults } from '../_lib/db.js';
import { authorized } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (!authorized(req, true)) return res.status(401).json({ error: 'Unauthorized' });
  if (!['GET', 'POST'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed' });

  let run;
  const started = Date.now();

  try {
    const config = await loadMeasurementConfig('both');
    const availableProviderIds = config.providers.map((provider) => provider.id).filter((id) => {
      if (id === 'chatgpt') return !!process.env.OPENAI_API_KEY;
      if (id === 'claude') return !!process.env.ANTHROPIC_API_KEY;
      if (id === 'perplexity') return !!process.env.PERPLEXITY_API_KEY;
      return false;
    });
    if (!availableProviderIds.length) {
      throw new Error('Нет API-ключей активных AI-провайдеров. Плановый запуск пропущен.');
    }

    run = await createRun({
      market: 'both',
      promptCount: config.prompts.length,
      providerIds: availableProviderIds,
    });
    const output = await runMonitoring({
      market: 'both',
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
    return res.status(500).json({ error: error.message || 'Cron failed' });
  }
}
