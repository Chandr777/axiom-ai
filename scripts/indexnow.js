import { readFile } from 'node:fs/promises'

// Run after deployment: npm run indexnow. One request reaches participating engines,
// including Bing and Yandex. Never submit before the key is publicly available.
const host = 'www.axiom-ai.su'
const key = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim()
if (!/^[a-f0-9]{32}$/.test(key)) throw new Error('Invalid IndexNow key')
const keyLocation = `https://${host}/${key}.txt`
const keyResponse = await fetch(keyLocation)
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error('Publish the IndexNow key before submitting URLs')
}
const sitemapResponse = await fetch(`https://${host}/sitemap.xml`)
if (!sitemapResponse.ok) throw new Error(`Sitemap HTTP ${sitemapResponse.status}`)
const sitemap = await sitemapResponse.text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
if (!urlList.length || urlList.some(url => new URL(url).origin !== `https://${host}`)) {
  throw new Error('Sitemap must contain canonical HTTPS URLs on the expected host')
}
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
})
if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow HTTP ${response.status}: ${await response.text()}`)
}
console.log(`IndexNow HTTP ${response.status}: ${urlList.length} URLs submitted${response.status === 202 ? '; key validation pending' : ''}. Indexing is not guaranteed.`)
