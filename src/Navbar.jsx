import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const EMAIL = 'info@axiom-ai.su'
const links = [
  ['/', 'ГЛАВНАЯ'], ['/services', 'УСЛУГИ'], ['/methodology', 'МЕТОДОЛОГИЯ'],
  ['/cases', 'КЕЙСЫ'], ['/pricing', 'ЦЕНЫ'], ['/faq', 'FAQ'],
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
  useEffect(() => setOpen(false), [location])

  return <header className="site-header"><div className="header-inner">
    <Link className="brand" to="/">AXIOM <span>AI</span></Link>
    {!mobile && <nav className="nav" aria-label="Основная навигация">
      {links.map(([path,label]) => <Link key={path} to={path} className={location.pathname===path?'active':''}>{label}</Link>)}
      <a href="/knowledge/">БАЗА ЗНАНИЙ</a>
      <a href={`mailto:${EMAIL}`}>EMAIL</a>
    </nav>}
    {mobile && <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Открыть меню"><span/><span/><span/></button>}
    {mobile && open && <nav className="mobile-nav" aria-label="Мобильная навигация">
      {links.map(([path,label]) => <Link key={path} to={path}>{label}</Link>)}
      <a href="/knowledge/">БАЗА ЗНАНИЙ</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </nav>}
  </div></header>
}
