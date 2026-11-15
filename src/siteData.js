import { articles } from './content/articles.js'

export const baseUrl = 'https://www.axiom-ai.su'
export const brandDescription = 'Axiom AI (axiom-ai.su), GEO-агентство'
export const organizationId = `${baseUrl}/#organization`

const routes = [
  ['/', 'Главная', 'GEO-продвижение и AEO — Axiom AI (axiom-ai.su)', 'Технический аудит, контент и измерение видимости бренда в ChatGPT, Claude и Perplexity. Услуги GEO-агентства Axiom AI (axiom-ai.su).', 'Home', 'Axiom AI (axiom-ai.su) — GEO and AEO agency', 'Technical audits, answer-focused content and transparent AI visibility measurement.', 'src/App.jsx'],
  ['/services', 'Услуги', 'Услуги GEO-продвижения и AEO — Axiom AI (axiom-ai.su)', 'GEO-аудит, согласованное описание компании, контент для ответов и мониторинг AI-видимости: состав работ и примеры передаваемых материалов.', 'Services', 'GEO and AEO services — Axiom AI (axiom-ai.su)', 'Technical accessibility, entity consistency, answer-focused content and AI visibility monitoring.', 'src/Services.jsx'],
  ['/methodology', 'Методология', 'Методология GEO/AEO — Axiom AI (axiom-ai.su)', 'Диагностика, внедрение и повторяемое измерение упоминаний, цитирований и точности фактов.', 'Methodology', 'GEO and AEO methodology — Axiom AI (axiom-ai.su)', 'A repeatable audit, implementation and measurement process with explicit limitations.', 'src/Methodology.jsx'],
  ['/cases', 'Кейсы', 'Проверяемые кейсы GEO — Axiom AI (axiom-ai.su)', 'Внутренний технический кейс axiom-ai.su с исходными HTTP-проверками и ограничениями выводов.', 'Case studies', 'Evidence-based GEO case studies — Axiom AI (axiom-ai.su)', 'An internal technical audit of axiom-ai.su with downloadable observations and clear limitations.', 'src/Cases.jsx'],
  ['/pricing', 'Цены', 'Цены на GEO и AEO в рублях — Axiom AI (axiom-ai.su)', 'FREE — 0 ₽, PRO — 43 000–87 000 ₽ за проект, BUSINESS — 140 000–160 000 ₽ в месяц. Состав и условия услуг.', 'Pricing', 'GEO and AEO pricing in RUB — Axiom AI (axiom-ai.su)', 'FREE: RUB 0. PRO: RUB 43,000–87,000 per project. BUSINESS: RUB 140,000–160,000 per month.', 'src/Pricing.jsx'],
  ['/faq', 'Вопросы и ответы', 'Вопросы о GEO и AEO — Axiom AI (axiom-ai.su)', 'Ответы о краулерах, llms.txt, Schema.org, индексации и измерении видимости в ответах ИИ.', 'FAQ', 'GEO and AEO FAQ — Axiom AI (axiom-ai.su)', 'Answers about search crawlers, llms.txt, structured data and AI visibility measurement.', 'src/FAQ.jsx'],
  ['/glossary', 'Глоссарий', 'Глоссарий GEO и AEO — Axiom AI (axiom-ai.su)', 'Определения GEO, AEO, LLM, RAG, JSON-LD, Mention Rate, Citation Rate и Share of Voice.', 'Glossary', 'GEO and AEO glossary — Axiom AI (axiom-ai.su)', 'Definitions of GEO, AEO, LLM, RAG, JSON-LD, Mention Rate, Citation Rate and Share of Voice.', 'src/Glossary.jsx'],
  ['/about', 'О компании', 'О GEO-агентстве Axiom AI (axiom-ai.su)', 'Специализация, принципы работы и проверяемые материалы GEO-агентства Axiom AI (axiom-ai.su).', 'About', 'About the GEO agency Axiom AI (axiom-ai.su)', 'Our services, evidence standards, publishing principles and official contact details.', 'src/Company.jsx'],
  ['/contacts', 'Контакты', 'Контакты Axiom AI (axiom-ai.su), GEO-агентства', 'Связь с GEO-агентством Axiom AI (axiom-ai.su): info@axiom-ai.su и форма заявки на аудит.', 'Contact', 'Contact Axiom AI (axiom-ai.su), GEO agency', 'Contact info@axiom-ai.su to discuss an audit, service scope or a published research finding.', 'src/Company.jsx'],
  ['/blog', 'Исследования и статьи', 'Исследования GEO и AEO — Axiom AI (axiom-ai.su)', 'Практические статьи о доступности сайта для AI-поиска и воспроизводимом измерении цитирований.', 'Research and articles', 'GEO and AEO research — Axiom AI (axiom-ai.su)', 'Practical articles on crawl accessibility and reproducible AI citation measurement.', 'src/Blog.jsx'],
  ['/cases/axiom-technical-audit', 'Технический аудит axiom-ai.su', 'Кейс: технический аудит axiom-ai.su — Axiom AI', 'Исходные данные проверки 17 URL: 11 ответов HTTP 200 и 6 ответов HTTP 404. Методика, исправления и ограничения.', 'Technical audit of axiom-ai.su', 'Case study: technical audit of axiom-ai.su — Axiom AI', 'A 17-URL technical audit: 11 HTTP 200 responses and 6 HTTP 404 responses, with downloadable raw observations.', 'src/ResearchCase.jsx'],
]

export const pages = routes.flatMap(([path, label, title, description, enLabel, enTitle, enDescription, source]) => [
  { path, label, title, description, lang: 'ru', alternate: path === '/' ? '/en' : `/en${path}`, sources: [source] },
  { path: path === '/' ? '/en' : `/en${path}`, label: enLabel, title: enTitle, description: enDescription, lang: 'en', alternate: path, sources: ['src/EnglishPage.jsx'] },
])

for (const article of articles) pages.push({ path: `/blog/${article.slug}`, label: article.title, title: `${article.title} — Axiom AI`, description: article.description, lang: 'ru', sources: ['src/content/articles.js', 'src/Blog.jsx'] })

pages.push({ path: '/research/ai-visibility-pilot', label: 'Исследование AI-видимости', title: 'Исследование AI-видимости: первичный срез — Axiom AI', description: 'Протокол и первичные ответы ChatGPT Search: фиксированные вопросы, повторы, полные тексты и источники. Ограничения доступа к Яндексу с Алисой и Perplexity.', lang: 'ru', sources: ['src/VisibilityStudy.jsx', 'src/content/geo-ai-pilot-v1.json', 'src/content/visibility-results.json'] })

for (const [path, label, title, source] of [
  ['/privacy', 'Конфиденциальность', 'Политика обработки персональных данных', 'src/Privacy.jsx'],
  ['/consent', 'Согласие на обработку', 'Согласие на обработку персональных данных', 'src/Consent.jsx'],
  ['/terms', 'Правила сайта', 'Правила использования сайта', 'src/SiteTerms.jsx'],
]) pages.push({ path, label, title: `${title} — Axiom AI (axiom-ai.su)`, description: `${title} на сайте GEO-агентства Axiom AI (axiom-ai.su).`, lang: 'ru', sources: [source] })

export function getPage(path) { return pages.find(page => page.path === path) }

export function languageAlternates(page) {
  if (!page?.alternate) return []
  const ru = page.lang === 'ru' ? page.path : page.alternate
  const en = page.lang === 'en' ? page.path : page.alternate
  return [{ lang: 'ru', path: ru }, { lang: 'en', path: en }, { lang: 'x-default', path: ru }]
}

export function breadcrumbItems(page) {
  if (!page || ['/', '/en'].includes(page.path)) return []
  const en = page.lang === 'en'
  const items = [{ name: en ? 'Home' : 'Главная', path: en ? '/en' : '/' }]
  const parent = page.path.slice(0, page.path.lastIndexOf('/'))
  if (parent && !['/en'].includes(parent)) {
    const entry = getPage(parent)
    if (entry) items.push({ name: entry.label, path: entry.path })
  }
  return [...items, { name: page.label, path: page.path }]
}

export const plans = [
  { id: 'free', name: 'FREE — AI-FOOTPRINT EXPRESS', min: 0, max: 0, ru: 'Разовый отчёт', en: 'One-time report' },
  { id: 'pro', name: 'PRO — GEO/AEO', min: 43000, max: 87000, ru: 'Разовая оплата за проект', en: 'One-time project' },
  { id: 'business', name: 'BUSINESS — GEO/AEO', min: 140000, max: 160000, ru: 'В месяц / контракт от 6 мес.', en: 'Per month / minimum six-month contract' },
]
