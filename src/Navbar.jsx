import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const EMAIL = 'info@axiom-ai.su'
const links = [
  ['/', 'ГЛАВНАЯ'], ['/services', 'УСЛУГИ'], ['/methodology', 'МЕТОДОЛОГИЯ'],
  ['/cases', 'КЕЙСЫ'], ['/pricing', 'ЦЕНЫ'], ['/faq', 'FAQ'], ['/glossary', 'ГЛОССАРИЙ'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 940)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" to="/">AXIOM <span>AI</span></Link>
    {!mobile && <nav className="nav" aria-label="Основная навигация">
      {links.map(([path,label]) => <Link key={path} to={path} className={location.pathname===path?'active':''} onClick={() => setOpen(false)}>{label}</Link>)}
      <a href={`mailto:${EMAIL}`}>EMAIL</a>
    </nav>}
    {mobile && <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Закрыть меню' : 'Открыть меню'}><span/><span/><span/></button>}
    {mobile && <nav id="mobile-navigation" className="mobile-nav" aria-label="Мобильная навигация" style={{display:open?'flex':'none'}}>
      {links.map(([path,label]) => <Link key={path} to={path} onClick={() => setOpen(false)}>{label}</Link>)}
<a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </nav>}
  </div></header>
}
