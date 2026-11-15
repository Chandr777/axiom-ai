import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import SiteFooter from './SiteFooter'
import ServiceCards from './ServiceCards'
import { serviceForPath } from './content/serviceCatalog'

export default function ServiceDetail() {
  const { pathname } = useLocation()
  const service = serviceForPath(pathname)
  const lang = pathname.startsWith('/en/') ? 'en' : 'ru'
  const en = lang === 'en'
  const data = service[lang]
  const prefix = en ? '/en' : ''
  const mail = `mailto:info@axiom-ai.su?subject=${encodeURIComponent(`${data.label} — axiom-ai.su`)}`
  return <div className="page-shell"><Navbar /><main className="page-content service-detail">
    <p className="eyebrow-dark">AXIOM AI · AXIOM-AI.SU · GEO / AEO</p>
    <h1>{data.h1}</h1><p className="page-lead">{data.lead}</p>
    <nav className="page-jumps" aria-label={en ? 'On this page' : 'Содержание страницы'}>
      <a href="#scope">{en ? 'Scope' : 'Состав работ'}</a><a href="#deliverables">{en ? 'Deliverables' : 'Результат'}</a><a href="#conditions">{en ? 'Timing and pricing' : 'Сроки и стоимость'}</a><a href="#service-faq">FAQ</a>
    </nav>
    <section><h2>{en ? 'Who is this for?' : 'Кому подходит услуга?'}</h2><ul className="readable-list">{data.audience.map(item => <li key={item}>{item}</li>)}</ul></section>
    <section id="scope"><h2>{en ? 'What is included?' : 'Что входит в работу?'}</h2>{data.scope.map(([title, body]) => <article className="glossary-item" key={title}><h3>{title}</h3><p>{body}</p></article>)}</section>
    <section id="deliverables"><h2>{en ? 'What will you receive?' : 'Что получает заказчик?'}</h2><ul className="readable-list">{data.outputs.map(item => <li key={item}>{item}</li>)}</ul>
      <aside className="notice-panel"><h3>{en ? 'Inspect the format before the project' : 'Посмотрите формат до начала проекта'}</h3><p><a href={service.artifact} download>{data.sample}</a></p><p>{en ? 'This is a template or structure example, not a client report or a claim of achieved results. Its column labels may be in Russian.' : 'Это шаблон или пример структуры, а не клиентский отчёт и не заявление о достигнутых результатах.'}</p></aside>
    </section>
    <section><h2>{en ? 'How does the work proceed?' : 'Как проходит работа?'}</h2><ol className="process-list">{data.process.map(([title, body]) => <li key={title}><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
    <section id="conditions"><h2>{en ? 'Timing and pricing' : 'Сроки и стоимость'}</h2><p>{data.timing}</p><p>{data.pricing}</p><p><a href={`${prefix}/pricing`}>{en ? 'Published packages and conditions' : 'Опубликованные тарифы и условия'}</a></p></section>
    <section><h2>{en ? 'Methods and inspectable evidence' : 'Методика и проверяемые примеры'}</h2><p>{en ? 'Our internal technical case documents observed website issues and fixes. The AI visibility pilot preserves actual answers and sources; it is an initial sample, not evidence of growth.' : 'Во внутреннем техническом кейсе показаны наблюдения и исправления собственного сайта. Пилот AI-видимости содержит реальные ответы и источники; это исходная выборка, а не доказательство роста.'}</p><ul className="readable-list"><li><a href={`${prefix}/methodology`}>{en ? 'Measurement methodology' : 'Методология измерений'}</a></li><li><a href={`${prefix}/cases/axiom-technical-audit`}>{en ? 'Internal technical case' : 'Внутренний технический кейс'}</a></li><li><a href="/research/ai-visibility-pilot" lang="ru">{en ? 'AI visibility protocol and initial observations (Russian)' : 'Протокол и первичный срез AI-видимости'}</a></li></ul></section>
    <section id="service-faq"><h2>{en ? 'Frequently asked questions' : 'Частые вопросы'}</h2>{data.faq.map(([q, a]) => <section className="faq-item" key={q}><h3>{q}</h3><p>{a}</p></section>)}</section>
    <section className="notice-panel"><h2>{en ? 'Discuss your task' : 'Обсудить задачу'}</h2><p>{en ? 'Email your website, brand, market and goal. Scope, access, implementation, timing and price are agreed before work starts.' : 'Напишите сайт, бренд, рынок и задачу. До начала работ согласуем состав, доступ к данным, объём внедрения, сроки и стоимость.'}</p><div className="service-actions"><a className="button button-blue" href={mail}>{en ? 'Email about this service' : 'Написать об этой услуге'}</a><a href="/#audit" lang="ru">{en ? 'Request a free express report (Russian form)' : 'Запросить бесплатный экспресс-отчёт'}</a></div></section>
    <section><h2>{en ? 'Related services' : 'Связанные услуги'}</h2><ServiceCards lang={lang} slugs={service.related} /></section>
  </main><SiteFooter /></div>
}
