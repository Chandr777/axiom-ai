import { execFileSync } from 'node:child_process'
import { stat, writeFile } from 'node:fs/promises'

const sharedSources = [
  'index.html', 'src/App.jsx', 'src/main.jsx', 'src/Navbar.jsx',
  'src/SiteFooter.jsx', 'src/usePageMeta.js', 'src/index.css',
  'scripts/prerender.js', 'public/og-image.png',
]
const pageSources = {
  '/services': 'src/Services.jsx',
  '/methodology': 'src/Methodology.jsx',
  '/cases': 'src/Cases.jsx',
  '/pricing': 'src/Pricing.jsx',
  '/faq': 'src/FAQ.jsx',
  '/glossary': 'src/Glossary.jsx',
  '/privacy': 'src/Privacy.jsx',
  '/consent': 'src/Consent.jsx',
  '/terms': 'src/SiteTerms.jsx',
}
const priorities = { '/': '1.0', '/cases': '0.6', '/pricing': '0.7', '/glossary': '0.7', '/privacy': '0.3', '/consent': '0.3', '/terms': '0.3' }

async function lastModified(files) {
  try {
    const timestamp = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    if (timestamp && Number.isFinite(Date.parse(timestamp))) return new Date(timestamp).toISOString()
  } catch {
    // Source archives may not include Git history. Use source mtimes in that case.
  }
  const sources = await Promise.all(files.map(file => stat(file)))
  return new Date(Math.max(...sources.map(source => source.mtimeMs))).toISOString()
}

export async function generateSitemap(pages, baseUrl) {
  const entries = await Promise.all(pages.map(async page => {
    const files = [...sharedSources, ...(pageSources[page.path] ? [pageSources[page.path]] : [])]
    const lastmod = await lastModified(files)
    return `<url><loc>${baseUrl}${page.path}</loc><lastmod>${lastmod}</lastmod><priority>${priorities[page.path] || '0.8'}</priority></url>`
  }))
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`)
}
