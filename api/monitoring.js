import { BRANDS } from './_lib/prompts.js';
import { getDashboard } from './_lib/db.js';
import { authorized } from './_lib/auth.js';

function calc(rows) {
  const successful = rows.filter((row) => row.status === 'success');
  const brands = BRANDS.map((brand) => {
    const has = (row, key) => (row.brands || []).some((item) => item.id === brand.id && item[key]);
    const mentionCount = successful.filter((row) => has(row, 'mentioned')).length;
    const citationCount = successful.filter((row) => has(row, 'cited')).length;
    const recommendationCount = successful.filter((row) => has(row, 'recommended')).length;
    const positions = successful
      .map((row) => (row.position_order || []).indexOf(brand.id))
      .filter((position) => position >= 0)
      .map((position) => position + 1);
    const avgPosition = positions.length
      ? positions.reduce((sum, position) => sum + position, 0) / positions.length
      : null;
    return {
      ...brand,
      mentionCount,
      avgPosition,
      mentionRate: successful.length ? (mentionCount / successful.length) * 100 : null,
      citationRate: successful.length ? (citationCount / successful.length) * 100 : null,
      recommendationRate: successful.length ? (recommendationCount / successful.length) * 100 : null,
    };
  });
  const totalMentions = brands.reduce((sum, brand) => sum + brand.mentionCount, 0);
  const ownBrand = brands.find((brand) => brand.id === 'axiom-ai');
  return {
    successCount: successful.length,
    failedCount: rows.length - successful.length,
    mentionRate: ownBrand?.mentionRate ?? null,
    shareOfVoice: totalMentions ? (ownBrand.mentionCount / totalMentions) * 100 : null,
    recommendationRate: ownBrand?.recommendationRate ?? null,
    citationRate: ownBrand?.citationRate ?? null,
    brands: brands.sort((a, b) => b.mentionCount - a.mentionCount),
  };
}

export default async function handler(req, res) {
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const runId = typeof req.query?.runId === 'string' ? req.query.runId : null;
    const dashboard = await getDashboard(runId);
    const selectedRun = dashboard.selectedRun;
    const rows = selectedRun
      ? dashboard.results.filter((row) => row.run_id === selectedRun.id)
      : [];
    return res.status(200).json({
      runs: dashboard.runs,
      selectedRun,
      latestRun: dashboard.runs[0] || null,
      metrics: calc(rows),
      byProvider: ['chatgpt', 'claude', 'perplexity'].map((provider) => ({
        provider,
        ...calc(rows.filter((row) => row.provider === provider)),
      })),
      byLocale: ['ru', 'en'].map((locale) => ({
        locale,
        ...calc(rows.filter((row) => row.locale === locale)),
      })),
      results: rows,
    });
  } catch (error) {
    const message = error.message || 'Dashboard load failed';
    const status = message.includes('не найден') ? 404 : 500;
    return res.status(status).json({ error: message });
  }
}
