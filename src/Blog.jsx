import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import SiteFooter from './SiteFooter'
import { articles } from './content/articles'
import { baseUrl, organizationId } from './siteData'

export default function Blog() {
  const { pathname } = useLocation()
  const article = articles.find(item => pathname === `/blog/${item.slug}`)
  return <div className="page-shell"><Navbar /><main className="page-content research-article">
    <p className="eyebrow-dark">ИССЛЕДОВАНИЯ AXIOM AI · AXIOM-AI.SU</p>
    <h1>{article?.title || 'Исследования и статьи о GEO и AEO'}</h1>
    {article ? <>
      <p className="article-byline">Редакция <a href="/about">Axiom AI (axiom-ai.su)</a> · <time dateTime="2026-11-15">15 ноября 2026</time></p>
      <p className="page-lead">{article.description}</p>
      {article.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
      <h2>Источники и проверка</h2><ul className="readable-list">{article.sources.map(([title, href]) => <li key={href}><a href={href}>{title}</a></li>)}</ul>
      <p>Вопросы по методике и исправления: <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a>.</p>
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${baseUrl}${pathname}#article`, headline: article.title, description: article.description, mainEntityOfPage: `${baseUrl}${pathname}`, datePublished: '2026-11-15', dateModified: '2026-11-15', inLanguage: 'ru', author: { '@type': 'Organization', '@id': organizationId, name: 'Редакция Axiom AI (axiom-ai.su)', url: `${baseUrl}/about` }, publisher: { '@id': organizationId }, image: `${baseUrl}/og-image.png` })}</script>
    </> : <>
      <p className="page-lead">Собственные технические наблюдения и практические методики. В каждом материале раскрываем способ проверки и ограничения выводов.</p>
      <div className="feature-grid">{articles.map(item => <article className="feature-card" key={item.slug}><p className="article-byline">15 ноября 2026 · Редакция Axiom AI</p><h2><a href={`/blog/${item.slug}`}>{item.title}</a></h2><p>{item.description}</p></article>)}</div>
      <p>Исходные HTTP-проверки собственного сайта доступны во <a href="/cases/axiom-technical-audit">внутреннем техническом кейсе</a>.</p>
    </>}
  </main><SiteFooter /></div>
}
