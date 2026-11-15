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
      <p><a href="/research/ai-visibility-pilot">Исследование AI-видимости: протокол и первичный срез ChatGPT Search</a>. Полные ответы и источники; межплатформенный замер ещё не завершён.</p>
      <section><h2>С чего начать проверку видимости бренда?</h2><p>Если важные страницы не открываются или их текст отсутствует в исходном HTML, начните с технического чек-листа выше. Для проверки описания компании в ответах используйте протокол измерения цитирований: он помогает зафиксировать вопросы, условия запуска и правила подсчёта до сбора данных. Эти задачи дополняют друг друга: исправный сайт ещё не означает присутствие бренда в ответе.</p><p>Для заказа диагностики на странице <a href="/services/geo-audit">GEO-аудита</a> раскрыты состав проверки и пример реестра проблем. Для регулярных сравнений есть <a href="/services/ai-visibility-monitoring">мониторинг AI-видимости</a> и шаблон журнала наблюдений.</p></section>
      <section><h2>Какие исходные данные уже опубликованы?</h2><p>В техническом кейсе сохранены результаты проверки одних и тех же 17 адресов до и после изменений: сначала 11 ответов HTTP 200 и 6 ответов HTTP 404, затем 17 ответов HTTP 200. Это результат проверки доступности адресов, а не измерение роста поискового трафика.</p><p>Первичный срез ChatGPT Search содержит 12 ответов: десять по общим коммерческим вопросам и два по вопросу с названием бренда. На странице исследования отдельно показаны упоминания, ссылки и ограничения доступа к другим системам. Полные тексты позволяют проверить выводы и увидеть контекст каждой ссылки.</p></section>
      <section><h2>Как использовать материалы в своём проекте?</h2><p>Сохраните исходное состояние, выберите страницы и вопросы под задачу компании, затем фиксируйте каждую правку и дату повторной проверки. Сравнивайте одинаковые условия, а пропущенные ответы учитывайте отдельно от ответов без упоминания бренда. Термины объясняем в <a href="/glossary">глоссарии GEO и AEO</a>, последовательность работ — в <a href="/methodology">методологии</a>.</p><p>Материалы публикует <a href="/about">редакция Axiom AI (axiom-ai.su)</a>. Замечания к данным и предложения исправлений принимаем по адресу <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a>; при обращении укажите страницу и проверяемое наблюдение.</p></section>
    </>}
  </main><SiteFooter /></div>
}
