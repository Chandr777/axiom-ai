import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const EMAIL = 'info@axiom-ai.su'
const TELEGRAM = 'https://t.me/MakarovLev'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path

  const linkStyle = (path) => ({
    color: isActive(path) ? '#00a8e8' : '#000000',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '1px',
    display: 'block',
    padding: '16px 0',
    borderBottom: '1px solid #e5e5e5',
    textAlign: 'center'
  })

  const desktopLink = (path) => ({
    color: isActive(path) ? '#00a8e8' : '#000000',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap'
  })

  const contactLink = {
    ...desktopLink(''),
    fontSize: '10px',
    color: '#333333',
    borderBottom: '1px solid #00a8e8',
    paddingBottom: '3px'
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      borderBottom: '2px solid #000000',
      backgroundColor: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      boxSizing: 'border-box',
      padding: isMobile ? '16px 24px' : '18px 28px'
    }}>
      <Link to="/" style={{
        fontSize: isMobile ? '26px' : '30px',
        fontWeight: '900',
        color: '#000000',
        letterSpacing: '1.5px',
        textDecoration: 'none',
        flexShrink: 0
      }}>AXIOM <span style={{ color: '#00a8e8' }}>AI</span></Link>

      {!isMobile && (
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'flex-end'
        }}>
          <Link to="/" style={desktopLink('/')}>ГЛАВНАЯ</Link>
          <Link to="/services" style={desktopLink('/services')}>УСЛУГИ</Link>
          <Link to="/methodology" style={desktopLink('/methodology')}>МЕТОДОЛОГИЯ</Link>
          <Link to="/cases" style={desktopLink('/cases')}>КЕЙСЫ</Link>
          <Link to="/pricing" style={desktopLink('/pricing')}>ЦЕНЫ</Link>
          <Link to="/faq" style={desktopLink('/faq')}>FAQ</Link>
          <Link to="/glossary" style={desktopLink('/glossary')}>ГЛОССАРИЙ</Link>
          <a href={`mailto:${EMAIL}`} style={contactLink}>info@axiom-ai.su</a>
          <a href={TELEGRAM} target="_blank" rel="noreferrer" style={contactLink}>@MakarovLev</a>
          <Link to="/audit" style={{
            backgroundColor: '#00a8e8',
            color: '#000000',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: '700',
            padding: '9px 14px',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap'
          }}>AI-АУДИТ</Link>
        </div>
      )}

      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            flexShrink: 0,
            width: '44px',
            height: '44px',
            minWidth: '44px'
          }}
          aria-label="Меню"
          aria-expanded={isOpen}
        >
          <div style={{
            width: '24px',
            height: '2.5px',
            backgroundColor: '#000000',
            margin: '3px 0',
            transition: '0.3s',
            transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            borderRadius: '2px'
          }} />
          <div style={{
            width: '24px',
            height: '2.5px',
            backgroundColor: '#000000',
            margin: '3px 0',
            transition: '0.3s',
            opacity: isOpen ? '0' : '1',
            borderRadius: '2px'
          }} />
          <div style={{
            width: '24px',
            height: '2.5px',
            backgroundColor: '#000000',
            margin: '3px 0',
            transition: '0.3s',
            transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            borderRadius: '2px'
          }} />
        </button>
      )}

      {isMobile && isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderBottom: '2px solid #000000',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 99,
          maxHeight: 'calc(100vh - 70px)',
          overflowY: 'auto'
        }}>
          <Link to="/" style={linkStyle('/')}>ГЛАВНАЯ</Link>
          <Link to="/services" style={linkStyle('/services')}>УСЛУГИ</Link>
          <Link to="/methodology" style={linkStyle('/methodology')}>МЕТОДОЛОГИЯ</Link>
          <Link to="/cases" style={linkStyle('/cases')}>КЕЙСЫ</Link>
          <Link to="/pricing" style={linkStyle('/pricing')}>ЦЕНЫ</Link>
          <Link to="/faq" style={linkStyle('/faq')}>FAQ</Link>
          <Link to="/glossary" style={linkStyle('/glossary')}>ГЛОССАРИЙ</Link>
          <a href={`mailto:${EMAIL}`} style={linkStyle('/')}>{EMAIL}</a>
          <a href={TELEGRAM} target="_blank" rel="noreferrer" style={linkStyle('/')}>Telegram: @MakarovLev</a>
          <Link to="/audit" style={{
            backgroundColor: '#00a8e8',
            color: '#000000',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '700',
            padding: '16px 20px',
            letterSpacing: '1px',
            display: 'block',
            textAlign: 'center',
            marginTop: '20px'
          }}>AI-АУДИТ</Link>
        </div>
      )}
    </nav>
  )
}
