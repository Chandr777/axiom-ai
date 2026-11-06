import Navbar from './Navbar'\nimport usePageMeta from './usePageMeta'

const terms = [
 ['GEO','Generative Engine Optimization — работа над тем, чтобы сведения о бренде были доступны, понятны и подтверждаемы в генеративных системах.'],
 ['AEO','Answer Engine Optimization — структурирование контента для прямого и полного ответа на конкретный вопрос пользователя.'],
 ['LLM','Large Language Model — большая языковая модель, формирующая текстовые ответы на основе контекста и данных.'],
 ['RAG','Retrieval-Augmented Generation — подход, при котором система извлекает материалы из внешних источников и использует их при формировании ответа.'],
 ['AI crawler','Автоматизированный робот, который получает доступ к веб-страницам для поиска, извлечения или иных заявленных оператором целей. Назначение зависит от конкретного бота.'],
 ['robots.txt','Файл с правилами обхода для совместимых роботов. Он не является механизмом авторизации и не гарантирует фактический обход.'],
 ['llms.txt','Необязательный текстовый файл-карта сайта для агентов, которые поддерживают такой формат. Он не заменяет контент, robots.txt и sitemap.xml.'],
 ['JSON-LD','Формат записи структурированных данных, в том числе Schema.org, в виде JSON внутри HTML-документа.'],
 ['Knowledge Graph','Граф знаний — модель данных, представляющая сущности и отношения между ними.'],
 ['Mention Rate','Доля ответов в тестовой выборке, где упоминается проверяемый бренд.'],
 ['Citation Rate','Доля ответов, содержащих ссылку на заданный домен или его страницу.'],
 ['Share of Voice','Доля упоминаний бренда среди упоминаний выбранного набора конкурентов по установленному правилу подсчёта.'],
]
export default function Glossary(){\n  usePageMeta("Глоссарий GEO и AEO — Axiom AI", "Определения GEO, AEO, LLM, RAG, AI crawler, JSON-LD, Mention Rate и Share of Voice.", "/glossary")
 return <div className="page-shell"><Navbar/><main className="page-content"><p className="eyebrow-dark">GEO / AEO TERMINOLOGY</p><h1>Глоссарий GEO и AEO</h1><p className="page-lead">Краткие определения терминов, используемых в технической оптимизации и измерении видимости бренда в генеративных системах.</p>
 {terms.map(([term,def])=><article className="glossary-item" key={term}><h2>{term}</h2><p>{def}</p></article>)}
 </main><footer className="site-footer"><p>© 2026 AXIOM AI · <a href="mailto:info@axiom-ai.su">info@axiom-ai.su</a> · <a href="https://t.me/MakarovLev">@MakarovLev</a></p></footer></div>
}
