import { loadMeasurementConfig } from './_lib/db.js';

export default async function handler(req, res) {
  // This diagnostic is intentionally restricted to the approved feature-branch Preview.
  if (
    process.env.VERCEL_ENV !== 'preview' ||
    process.env.VERCEL_GIT_COMMIT_REF !== 'feat/ai-share-of-voice'
  ) {
    return res.status(404).json({ error: 'Not found' });
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessKey = process.env.MONITORING_ACCESS_KEY;
  if (!accessKey) {
    return res.status(503).json({ ok: false, reason: 'monitoring_key_unavailable' });
  }

  try {
    // Exercise the same server-side Supabase reader used by the measurement API.
    const config = await loadMeasurementConfig('both');

    // Call the real monitoring HTTP endpoint. Forward only the short-lived Vercel
    // share authorization from this request; never return or log either credential.
    const requestUrl = new URL(req.url, `https://${process.env.VERCEL_URL}`);
    const targetUrl = new URL('/api/monitoring', `https://${process.env.VERCEL_URL}`);
    const shareToken = requestUrl.searchParams.get('_vercel_share');
    if (shareToken) targetUrl.searchParams.set('_vercel_share', shareToken);

    const headers = {
      accept: 'application/json',
      'x-monitoring-key': accessKey,
    };
    if (req.headers.cookie) headers.cookie = req.headers.cookie;

    const response = await fetch(targetUrl, { method: 'GET', headers });
    const payload = await response.json().catch(() => ({}));

    if (response.status !== 200) {
      return res.status(502).json({
        ok: false,
        apiStatus: response.status,
        reason: response.status === 401 ? 'application_auth_rejected' : 'monitoring_api_failed',
        supabaseRead: {
          brands: config.brands.length,
          prompts: config.prompts.length,
          providers: config.providers.length,
        },
      });
    }

    return res.status(200).json({
      ok: true,
      apiStatus: response.status,
      supabaseRead: {
        brands: config.brands.length,
        prompts: config.prompts.length,
        providers: config.providers.length,
      },
      dashboardRead: {
        runs: Array.isArray(payload.runs) ? payload.runs.length : null,
        hasSelectedRun: Boolean(payload.selectedRun),
        results: Array.isArray(payload.results) ? payload.results.length : null,
      },
    });
  } catch {
    return res.status(503).json({ ok: false, reason: 'diagnostic_failed' });
  }
}
