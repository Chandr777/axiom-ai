import { Link, useLocation } from 'react-router-dom'
import { breadcrumbItems, getPage } from './siteData'

export default function Breadcrumbs() {
  const page = getPage(useLocation().pathname)
  const items = breadcrumbItems(page)
  if (!items.length) return null
  return <nav className="breadcrumbs" aria-label={page.lang === 'en' ? 'Breadcrumbs' : 'Хлебные крошки'}><ol>
    {items.map((item, i) => <li key={item.path}>{i === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link to={item.path}>{item.name}</Link>}</li>)}
  </ol></nav>
}
