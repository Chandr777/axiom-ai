import { execFileSync } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { pages } from '../src/siteData.js'
import { contentHash } from './sitemap.js'

let previous = {}
try { previous = JSON.parse(await readFile('content-dates.json', 'utf8')) } catch { /* First publication. */ }
const now = new Date().toISOString()
const dates = {}
for (const page of pages) {
  const hash = await contentHash(page)
  let lastmod = previous[page.path]?.lastmod
  if (previous[page.path]?.contentHash !== hash) {
    lastmod = now
    if (!previous[page.path]) {
      try {
        execFileSync('git', ['ls-files', '--error-unmatch', ...page.sources], { stdio: 'ignore' })
        execFileSync('git', ['diff', '--quiet', 'HEAD', '--', ...page.sources], { stdio: 'ignore' })
        const timestamp = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...page.sources], { encoding: 'utf8' }).trim()
        if (Number.isFinite(Date.parse(timestamp))) lastmod = new Date(timestamp).toISOString()
      } catch { /* New or edited content is being published now. */ }
    }
  }
  dates[page.path] = { contentHash: hash, lastmod }
}
await writeFile('content-dates.json', JSON.stringify(dates, null, 2) + '\n')
console.log(`Recorded content modification dates for ${pages.length} pages. Unchanged content retains its date.`)
