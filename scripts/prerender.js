import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

const baseUrl = 'https://www.axiom-ai.su'
const pages = [
  { path: '/', title: 'Axiom AI — GEO и AEO для видимости бренда', description: 'Техническая доступность, фактический контент, структурированные данные и измерение AI-видимости.' },
  { path: '/services', title: 'Услуги GEO и AEO — Axiom AI', description: 'Техническая доступность, структурирование фактов, контент для ответных систем и измерение видимости бренда.' },
  { path: '/methodology', title: 'Методология GEO/AEO — Axiom AI', description: 'Как Axiom AI проводит аудит, внедряет улучшения и измеряет видимость в генеративных системах.' },
  { path: '/cases', title: 'Кейсы GEO и AEO — Axiom AI', description: 'Подход Axiom AI к публикации проверяемых результатов и доказательств работ по GEO/AEO.' },
  { path: '/pricing', title: 'Цены на GEO и AEO — Axiom AI', description: 'Пакеты и стоимость услуг Axiom AI по технической доступности, контенту и AI-видимости.' },
  { path: '/faq', title: 'Частые вопросы о GEO и AEO — Axiom AI', description: 'Ответы о GEO, AEO, AI-краулерах, robots.txt, llms.txt, Schema.org и измерении видимости.' },
  { path: '/glossary', title: 'Глоссарий GEO и AEO — Axiom AI', description: 'Определения терминов GEO, AEO, генеративного поиска и измерения видимости.' },
  { path: '/privacy', title: 'Политика обработки персональных данных — Axiom AI', description: 'Какие данные получает форма Axiom AI, зачем они нужны и как связаться по вопросам обработки.' },
  { path: '/consent', title: 'Согласие на обработку персональных данных — Axiom AI', description: 'Отдельное согласие для отправки заявки через форму Axiom AI.' },
  { path: '/terms', title: 'Правила использования сайта — Axiom AI', description: 'Информация об использовании сайта Axiom AI, заявках и отсутствии гарантий поисковых позиций.' },
  { path: '/audit', canonicalPath: '/', title: 'Axiom AI — GEO и AEO для видимости бренда', description: 'Техническая доступность, фактический контент, структурированные данные и измерение AI-видимости.' },
]

const server = await createServer({ configFile: path.resolve('vite.config.js'), server: { middlewareMode: true }, appType: 'custom' })
try {
  const { AppRoutes } = await server.ssrLoadModule('/src/App.jsx')
  const template = await readFile('dist/index.html', 'utf8')
  for (const page of pages) {
    const app = renderToString(createElement(MemoryRouter, { initialEntries: [page.path] }, createElement(AppRoutes)))
    const canonical = `${baseUrl}${page.canonicalPath || page.path}`
    const html = template
      .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${page.description}" />`)
      .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
      .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${page.title}" />`)
      .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${page.description}" />`)
      .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${page.title}" />`)
      .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${page.description}" />`)
    const out = page.path === '/' ? 'dist/index.html' : path.join('dist', page.path.slice(1), 'index.html')
    await mkdir(path.dirname(out), { recursive: true })
    await writeFile(out, html)
  }
} finally {
  await server.close()
}
