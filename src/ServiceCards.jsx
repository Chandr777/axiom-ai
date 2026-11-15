import { serviceCatalog, servicePath } from './content/serviceCatalog'

export default function ServiceCards({ lang = 'ru', slugs }) {
  const items = slugs ? serviceCatalog.filter(service => slugs.includes(service.slug)) : serviceCatalog
  return <div className="feature-grid">{items.map(service => <article className="feature-card" key={service.slug}>
    <h3><a href={servicePath(service.slug, lang)}>{service[lang].label}</a></h3>
    <p>{service[lang].lead}</p>
    <a className="text-link" href={servicePath(service.slug, lang)}>{lang === 'en' ? 'Scope and deliverables →' : 'Состав и результат работ →'}</a>
  </article>)}</div>
}
