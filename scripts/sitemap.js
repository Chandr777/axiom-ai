import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { languageAlternates } from '../src/siteData.js'

export async function contentHash(page) {
  const sources = await Promise.all(page.sources.map(file => readFile(file, 'utf8')))
  return createHash('sha256').update(JSON.stringify({ sources, title: page.title, description: page.description, lang: page.lang })).digest('hex')
}

export async function generateSitemap(pages, baseUrl) {
  const dates = JSON.parse(await readFile('content-dates.json', 'utf8'))
  const entries = await Promise.all(pages.map(async page => {
    const entry = dates[page.path]
    if (!entry || entry.contentHash !== await contentHash(page) || !Number.isFinite(Date.parse(entry.lastmod))) {
      throw new Error(`Content date missing or outdated for ${page.path}. Run npm run content:dates and commit content-dates.json.`)
    }
    const alternates = languageAlternates(page).map(item => `<xhtml:link rel="alternate" hreflang="${item.lang}" href="${baseUrl}${item.path}"/>`).join('')
    return `<url><loc>${baseUrl}${page.path}</loc><lastmod>${entry.lastmod}</lastmod>${alternates}</url>`
  }))
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`)
}
