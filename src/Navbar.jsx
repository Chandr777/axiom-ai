import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import { getPage } from './siteData'

const EMAIL = 'info@axiom-ai.su'
const links = [
  ['/', 'ГЛАВНАЯ'], ['/services', 'УСЛУГИ'], ['/methodology', 'МЕТОДОЛОГИЯ'],
  ['/cases', 'КЕЙСЫ'], ['/pricing', 'ЦЕНЫ'], ['/faq', 'FAQ'], ['/glossary', 'ГЛОССАРИЙ'],
]
const englishLinks = [
  ['/en', 'HOME'], ['/en/services', 'SERVICES'], ['/en/methodology', 'METHOD'],
  ['/en/cases', 'CASES'], ['/en/pricing', 'PRICING'], ['/en/faq', 'FAQ'], ['/en/about', 'ABOUT'], ['/en/contacts', 'CONTACT'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const location = useLocation()
  const page = getPage(location.pathname)
  const en = page?.lang === 'en'
  const navigation = en ? englishLinks : links

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 940)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return <><header className="site-header"><div className="header-inner">
    <Link className="brand" to={en ? '/en' : '/'}>AXIOM <span>AI</span><small>{en ? 'GEO AGENCY · AXIOM-AI.SU' : 'GEO-АГЕНТСТВО · AXIOM-AI.SU'}</small></Link>
    {!mobile && <nav className="nav" aria-label={en ? 'Main navigation' : 'Основная навигация'}>
      {navigation.map(([path,label]) => <Link key={path} to={path} className={location.pathname===path?'active':''} onClick={() => setOpen(false)}>{label}</Link>)}
      {page?.alternate && <Link to={page.alternate} lang={en ? 'ru' : 'en'} hrefLang={en ? 'ru' : 'en'}>{en ? 'RU' : 'EN'}</Link>}
      <a href={`mailto:${EMAIL}`}>EMAIL</a>
    </nav>}
    {mobile && <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={en ? (open ? 'Close menu' : 'Open menu') : (open ? 'Закрыть меню' : 'Открыть меню')}><span/><span/><span/></button>}
    {mobile && <nav id="mobile-navigation" className="mobile-nav" aria-label={en ? 'Mobile navigation' : 'Мобильная навигация'} style={{display:open?'flex':'none'}}>
      {navigation.map(([path,label]) => <Link key={path} to={path} onClick={() => setOpen(false)}>{label}</Link>)}
      {page?.alternate && <Link to={page.alternate} lang={en ? 'ru' : 'en'} onClick={() => setOpen(false)}>{en ? 'Русский' : 'English'}</Link>}
<a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </nav>}
  </div></header><Breadcrumbs /></>
}
