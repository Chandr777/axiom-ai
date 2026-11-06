import Navbar from './Navbar'

const services = [
 ['Техническая доступность','Проверяем robots.txt, sitemap.xml, DNS, HTTPS, коды ответов, редиректы, canonical, robots meta, CDN/WAF и доступность контента для роботов.'],
 ['Архитектура фактов и сущностей','Выстраиваем согласованное описание компании, услуг, продуктов, географии и контактов; внедряем подходящую Schema.org JSON-LD-разметку.'],
 ['Контент для ответов','Создаём отдельные страницы под конкретные вопросы аудитории: прямой ответ, детали, условия, примеры, ограничения и ссылки на подтверждения.'],
 ['Внешние сигналы доверия','Проверяем публичные профили, бизнес-каталоги, реальные отзывы, отраслевые публикации и согласованность сведений о компании.'],
 ['Мониторинг AI-видимости','Фиксируем запросы, платформы, регион и дату; измеряем упоминания, цитирования, рекомендации, Share of Voice и фактическую точность.'],
]

export default function Services(){
 return <div className="page-shell"><Navbar/><main className="page-content">
  <p className="eyebrow-dark">GEO / AEO SERVICES</p><h1>Услуги Axiom AI</h1>
  <p className="page-lead">Помогаем компаниям сделать публичную информацию технически доступной, понятной для машин и проверяемой для людей. Каждый проект начинается с диагностики и заканчивается повторным измерением.</p>
  {services.map(([title,body],i)=><section className="service-row" key={title}><span className="step">0{i+1}</span><div><h2>{title}</h2><p>{body}</p></div></section>)}
  <aside className="notice-panel"><h2>Что мы не обещаем</h2><p>Мы не гарантируем первое место в ответах ChatGPT, Claude, Perplexity или Google. Генеративные ответы зависят от запроса, региона, версии системы, доступных источников и других факторов. Мы отвечаем за качество выполненных работ, прозрачность методики и измеримость изменений.</p></aside>
  <p>Смотрите также <a href="/methodology">методологию работы</a> и <a href="/knowledge/">базу знаний GEO/AEO</a>.</p>
 </main><footer className="site-footer"><p>© 2026 AXIOM AI · <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a> · <a href="https://t.me/MakarovLev">@MakarovLev</a></p></footer></div>
}
