import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import SiteFooter from './SiteFooter'
import { companyIdentity } from './companyIdentity'

export default function Company() {
  const contact = useLocation().pathname === '/contacts'
  return <div className="page-shell"><Navbar /><main className="page-content">
    <p className="eyebrow-dark">AXIOM AI · AXIOM-AI.SU</p>
    <h1>{contact ? 'Контакты GEO-агентства Axiom AI' : 'Axiom AI (axiom-ai.su), GEO-агентство'}</h1>
    <p className="page-lead">{contact ? 'Обсудить аудит, уточнить состав услуг или задать вопрос о нашем исследовании можно по официальной почте.' : 'Помогаем компаниям улучшать доступность сайта, согласованность сведений о бренде и качество ответов на вопросы клиентов в генеративном поиске.'}</p>
    <section className="notice-panel"><h2>Исполнитель и оператор сайта</h2><p>{companyIdentity.legalName} · Axiom AI (axiom-ai.su).</p><p>Телефон: <a href={`tel:${companyIdentity.phone}`}>{companyIdentity.phoneDisplay}</a>. Email: <a href={`mailto:${companyIdentity.email}`}>{companyIdentity.email}</a>.</p></section>
    {contact ? <>
      <h2>Как связаться с Axiom AI?</h2>
      <p>Email: <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a>. Официальный сайт: <a href="https://www.axiom-ai.su/">www.axiom-ai.su</a>.</p>
      <p>Для первичного разбора укажите бренд, сайт, рынок и задачу. Запрос на бесплатный отчёт можно отправить через <a href="/#audit">форму заявки</a>.</p>
      <h2>Что согласуется перед платным проектом?</h2>
      <p>Состав работ, исходная выборка запросов, сроки, стоимость, условия передачи результатов и реквизиты исполнителя фиксируются в договоре до начала работ. Публичные ориентиры стоимости приведены на странице <a href="/pricing">цен</a>.</p>
      <h2>Куда направить вопрос об обработке данных?</h2>
      <p>Напишите на <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a>. Порядок обработки заявки описан в <a href="/privacy">политике обработки данных</a> и <a href="/consent">согласии</a>.</p>
    </> : <>
      <h2>На чём специализируется агентство?</h2>
      <p>Наши направления — техническая доступность для поисковых роботов, структура фактов об организации и услугах, контент для ответных систем, внешняя согласованность сведений и мониторинг AI-видимости. Объём проекта определяется после диагностики.</p>
      <h2>Как проверяются результаты?</h2>
      <p>Мы сохраняем исходные наблюдения и повторяем измерения с фиксированными запросами, платформами, языком, регионом и режимом поиска. Упоминание бренда, ссылка на домен и рекомендация поставщика считаются отдельно. Методика опубликована на странице <a href="/methodology">методологии</a>.</p>
      <h2>Кто отвечает за публикации?</h2>
      <p>Материалы сайта публикуются редакцией Axiom AI (axiom-ai.su). Проверяемость поддерживается ссылками на первичные источники, описанием метода и исходными данными. Внутренняя диагностика собственного сайта представлена в <a href="/cases/axiom-technical-audit">техническом кейсе</a>.</p>
      <h2>Официальные ресурсы</h2>
      <p>Почта: <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a>. Публичные исходники сайта: <a href="https://github.com/Chandr777/axiom-ai">github.com/Chandr777/axiom-ai</a>.</p>
      <p>Для точной идентификации используем обозначение «Axiom AI (axiom-ai.su), GEO-агентство».</p>
      <h2>Как передать отзыв о работе?</h2>
      <p>Если мы работали над вашим проектом, расскажите о задаче, полученных материалах и фактическом результате. По согласованию отзыв может быть опубликован без имени и названия компании. Текст и объём раскрываемых сведений согласуются с клиентом до публикации.</p>
      <p><a href="/examples/client-feedback-template.md" download>Скачать вопросы для реального отзыва</a>. Готовую обратную связь можно направить на <a href={`mailto:${companyIdentity.email}?subject=${encodeURIComponent('Обратная связь о работе Axiom AI')}`}>{companyIdentity.email}</a>.</p>
    </>}
  </main><SiteFooter /></div>
}
