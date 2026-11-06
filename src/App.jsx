import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'
import Services from './Services'
import Methodology from './Methodology'
import Cases from './Cases'
import Pricing from './Pricing'
import FAQ from './FAQ'
import Glossary from './Glossary'
import Monitoring from './Monitoring'
import heroVideo from './assets/hero-video.mp4'
import usePageMeta from './usePageMeta'

function Home() {
  usePageMeta('Axiom AI — GEO и AEO для видимости бренда', 'Техническая доступность, фактический контент, структурированные данные и измерение AI-видимости.', '/')
  const [form, setForm] = useState({ company: '', website: '', contact: '' })
  const [prepared, setPrepared] = useState(false)

  function prepareEmail(event) {
    event.preventDefault()
    const subject = encodeURIComponent('Запрос GEO/AEO-аудита — Axiom AI')
    const body = encodeURIComponent([
      'Здравствуйте! Хочу обсудить GEO/AEO-аудит.',
      '',
      `Компания: ${form.company}`,
      `Сайт: ${form.website}`,
      `Контакт для ответа: ${form.contact}`,
    ].join('\n'))
    setPrepared(true)
    window.location.href = `mailto:info@axiom-ai.su?subject=${subject}&body=${body}`
  }

  return <div className="site-shell">
    <Navbar />
    <main>
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/favicon.svg" aria-hidden="true">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">GENERATIVE ENGINE OPTIMIZATION · ANSWER ENGINE OPTIMIZATION</p>
          <h1>Сделайте бренд понятным для генеративного поиска</h1>
          <p className="hero-lead">Axiom AI помогает улучшать доступность, точность и структуру информации о компании для поисковых систем и AI-помощников. Технический аудит, ответы на реальные вопросы клиентов и измерение видимости — в единой методологии.</p>
          <div className="hero-actions">
            <a className="button button-blue" href="#audit">Обсудить аудит</a>
            <a className="button button-outline" href="/knowledge/">База знаний GEO/AEO</a>
          </div>
          <p className="hero-note">Без обещаний гарантированного места в ответах моделей — с проверяемыми изменениями и понятными метриками.</p>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow-dark">КАК РАБОТАЕТ GEO/AEO</p>
        <h2>Три задачи системной работы</h2>
        <div className="feature-grid">
          <article className="feature-card"><span className="step">01 / ДОСТУПНОСТЬ</span><h3>Системы могут прочитать сайт</h3><p>Проверяем DNS, HTTPS, robots.txt, sitemap.xml, коды ответов, CDN/WAF и доступность важного контента в HTML.</p></article>
          <article className="feature-card"><span className="step">02 / ПОНЯТНОСТЬ</span><h3>Факты легко извлечь и проверить</h3><p>Структурируем услуги, цены, контакты, географию, ответы на вопросы и данные Schema.org без расхождений между страницами.</p></article>
          <article className="feature-card"><span className="step">03 / ДОКАЗАТЕЛЬСТВА</span><h3>Утверждения подтверждаются источниками</h3><p>Анализируем внешние профили, реальные отзывы, публикации, первичные данные и повторяемые замеры по фиксированной выборке запросов.</p></article>
        </div>
      </section>

      <section className="dark-section">
        <div className="section narrow">
          <p className="eyebrow">ОТ ТЕХНИЧЕСКОГО АУДИТА ДО МОНИТОРИНГА</p>
          <h2>Не «оптимизация под алгоритм», а понятная система фактов</h2>
          <p>Сначала устраняем препятствия для обхода. Затем создаём страницы, которые прямо отвечают на вопросы клиентов. После публикации измеряем упоминания, цитирования, рекомендации и точность сведений в тех же AI-системах.</p>
          <a className="button button-blue" href="/methodology">Посмотреть методологию</a>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow-dark">БАЗА ЗНАНИЙ</p>
        <h2>Ответы на конкретные вопросы о GEO и AEO</h2>
        <div className="feature-grid">
          <a className="feature-card link-card" href="/knowledge/geo-vs-seo/"><span className="step">ОСНОВЫ</span><h3>GEO и SEO: в чём разница?</h3><p>Как сочетаются SEO, GEO и AEO, какие факты и страницы нужны бренду.</p></a>
          <a className="feature-card link-card" href="/knowledge/robots-and-ai-crawlers/"><span className="step">ТЕХНИКА</span><h3>Как открыть сайт для AI-краулеров?</h3><p>Поисковые роботы, обучающие краулеры, CDN, WAF и robots.txt.</p></a>
          <a className="feature-card link-card" href="/knowledge/measure-ai-visibility/"><span className="step">АНАЛИТИКА</span><h3>Как измерить AI-видимость?</h3><p>Mention Rate, Citation Rate, Share of Voice и точность фактов.</p></a>
        </div>
        <a className="text-link" href="/knowledge/">Все руководства в базе знаний →</a>
      </section>

      <section id="audit" className="audit-section">
        <div className="section narrow">
          <p className="eyebrow-dark">AI VISIBILITY DIAGNOSTIC</p>
          <h2>Обсудим аудит AI-присутствия</h2>
          <p className="center-copy">Заполните поля — сайт подготовит письмо в вашем почтовом приложении. Заявка не отправляется автоматически и не сохраняется на этом сайте.</p>
          {prepared && <p className="notice">Почтовое приложение должно открыться с подготовленным письмом. Проверьте адрес и отправьте его вручную.</p>}
          <form className="contact-form" onSubmit={prepareEmail}>
            <input required aria-label="Компания или бренд" placeholder="Компания / бренд" value={form.company} onChange={e => setForm({...form, company:e.target.value})} />
            <input required type="url" aria-label="Сайт компании" placeholder="Сайт компании" value={form.website} onChange={e => setForm({...form, website:e.target.value})} />
            <input required aria-label="Контакт" placeholder="Ваш email или Telegram" value={form.contact} onChange={e => setForm({...form, contact:e.target.value})} />
            <button className="button button-dark" type="submit">Подготовить письмо</button>
          </form>
          <p className="contact-line">Или напишите напрямую: <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a> · <a href="https://t.me/MakarovLev" target="_blank" rel="noreferrer">@MakarovLev</a></p>
        </div>
      </section>
    </main>
    <footer className="site-footer"><p>© {new Date().getFullYear()} AXIOM AI · GEO / AEO consulting</p><p><a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a> · <a href="https://t.me/MakarovLev" target="_blank" rel="noreferrer">@MakarovLev</a> · <a href="/llms.txt">llms.txt</a></p></footer>
  </div>
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Services />} />
    <Route path="/methodology" element={<Methodology />} />
    <Route path="/cases" element={<Cases />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/glossary" element={<Glossary />} />
    <Route path="/monitoring" element={<Monitoring />} />
    <Route path="/audit" element={<Home />} />
  </Routes></BrowserRouter>
}
