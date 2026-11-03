import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
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
    padding: '20px 0',
    borderBottom: '1px solid #e5e5e5',
    textAlign: 'center'
  })

  const linkStyleDesktop = (path) => ({
    color: isActive(path) ? '#00a8e8' : '#000000',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1px'
  })

  return (
    <nav style={{
      ...styles.nav,
      padding: isMobile ? '16px 20px' : '24px 40px'
    }}>
      <Link to="/" style={styles.logo}>AXIOM <span style={styles.logoBlue}>AI</span></Link>
      
      {/* Десктопное меню */}
      {!isMobile && (
        <div style={styles.navLinks}>
          <Link to="/" style={linkStyleDesktop('/')}>ГЛАВНАЯ</Link>
          <Link to="/services" style={linkStyleDesktop('/services')}>УСЛУГИ</Link>
          <Link to="/methodology" style={linkStyleDesktop('/methodology')}>МЕТОДОЛОГИЯ</Link>
          <Link to="/cases" style={linkStyleDesktop('/cases')}>КЕЙСЫ</Link>
          <Link to="/faq" style={linkStyleDesktop('/faq')}>FAQ</Link>
          <Link to="/glossary" style={linkStyleDesktop('/glossary')}>ГЛОССАРИЙ</Link>
          <Link to="/audit" style={styles.linkButton}>AI-АУДИТ</Link>
        </div>
      )}

      {/* Бургер-кнопка для мобильных */}
      {isMobile && (
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          style={{
            ...styles.burgerButton,
            position: 'relative',
            zIndex: 101
          }}
          aria-label="Меню"
        >
          <div style={{
            width: '28px',
            height: '3px',
            backgroundColor: '#000000',
            margin: '4px 0',
            transition: '0.3s',
            transform: isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none',
            borderRadius: '2px'
          }} />
          <div style={{
            width: '28px',
            height: '3px',
            backgroundColor: '#000000',
            margin: '4px 0',
            transition: '0.3s',
            opacity: isOpen ? '0' : '1',
            borderRadius: '2px'
          }} />
          <div style={{
            width: '28px',
            height: '3px',
            backgroundColor: '#000000',
            margin: '4px 0',
            transition: '0.3s',
            transform: isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none',
            borderRadius: '2px'
          }} />
        </button>
      )}

      {/* Мобильное меню */}
      {isMobile && isOpen && (
        <div style={{
          ...styles.mobileMenu,
          top: '100%',
          maxHeight: 'calc(100vh - 70px)',
          overflowY: 'auto'
        }}>
          <Link to="/" style={linkStyle('/')}>ГЛАВНАЯ</Link>
          <Link to="/services" style={linkStyle('/services')}>УСЛУГИ</Link>
          <Link to="/methodology" style={linkStyle('/methodology')}>МЕТОДОЛОГИЯ</Link>
          <Link to="/cases" style={linkStyle('/cases')}>КЕЙСЫ</Link>
          <Link to="/faq" style={linkStyle('/faq')}>FAQ</Link>
          <Link to="/glossary" style={linkStyle('/glossary')}>ГЛОССАРИЙ</Link>
          <Link to="/audit" style={{
            ...styles.linkButton,
            display: 'block',
            textAlign: 'center',
            marginTop: '20px',
            padding: '16px 20px'
          }}>AI-АУДИТ</Link>
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderBottom: '2px solid #000000', 
    backgroundColor: '#ffffff', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100,
    width: '100%',
    boxSizing: 'border-box'
  },
  logo: { 
    fontSize: '24px', 
    fontWeight: '900', 
    color: '#000000', 
    letterSpacing: '2px',
    textDecoration: 'none',
    flexShrink: 0
  },
  logoBlue: { color: '#00a8e8' },
  navLinks: { 
    display: 'flex', 
    gap: '20px', 
    alignItems: 'center', 
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  linkButton: { 
    backgroundColor: '#000000', 
    color: '#ffffff', 
    textDecoration: 'none', 
    fontSize: '13px', 
    fontWeight: '700', 
    padding: '10px 20px', 
    letterSpacing: '1px' 
  },
  burgerButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    flexShrink: 0,
    minWidth: '48px',
    minHeight: '48px'
  },
  mobileMenu: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderBottom: '2px solid #000000',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    zIndex: 99
  }
}
