import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import { generateSitemap } from './sitemap.js'
import { baseUrl, pages, languageAlternates } from '../src/siteData.js'

const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const decode = text => text.replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code) => String.fromCodePoint(code[0] === 'x' ? parseInt(code.slice(1), 16) : Number(code))).replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
function mainText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || ''
  return decode(main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<\/(h[1-6]|p|li|section|tr|caption)>/g, '\n\n').replace(/<(h[1-6])\b[^>]*>/g, (_, tag) => '\n' + '#'.repeat(Number(tag[1])) + ' ').replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' ').replace(/\n */g, '\n').replace(/\n{3,}/g, '\n\n')).trim()
}

const server = await createServer({ configFile: path.resolve('vite.config.js'), server: { middlewareMode: true }, appType: 'custom' })
try {
  const { AppRoutes } = await server.ssrLoadModule('/src/App.jsx')
  const template = await readFile('dist/index.html', 'utf8')
  const fullText = ['# Axiom AI (axiom-ai.su), GEO-агентство / GEO agency', '> Полный текст опубликованных страниц. Generated from the same rendered content as the website. No indexing or ranking guarantee.']
  for (const page of pages) {
    const app = renderToString(createElement(MemoryRouter, { initialEntries: [page.path] }, createElement(AppRoutes)))
    const canonical = `${baseUrl}${page.path}`
    const alternateLinks = languageAlternates(page).map(item => `<link rel="alternate" hreflang="${item.lang}" href="${baseUrl}${item.path}" />`).join('\n    ')
    const html = template
      .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      .replace('<html lang="ru">', `<html lang="${page.lang}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(page.description)}" />`)
      .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />\n    ${alternateLinks}`)
      .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escape(page.title)}" />`)
      .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escape(page.description)}" />`)
      .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
      .replace(/<meta property="og:locale" content="[^"]*"\s*\/>/, `<meta property="og:locale" content="${page.lang === 'en' ? 'en_US' : 'ru_RU'}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escape(page.title)}" />`)
      .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escape(page.description)}" />`)
    const out = page.path === '/' ? 'dist/index.html' : path.join('dist', page.path.slice(1), 'index.html')
    await mkdir(path.dirname(out), { recursive: true })
    await writeFile(out, html)
    fullText.push(`\n---\n\nURL: ${canonical}\nLanguage: ${page.lang}\n\n${mainText(app)}`)
  }
  await writeFile('dist/llms-full.txt', fullText.join('\n\n') + '\n')
  await generateSitemap(pages, baseUrl)
  console.log(`Prerendered ${pages.length} pages; generated sitemap.xml and llms-full.txt.`)
} finally {
  await server.close()
}
