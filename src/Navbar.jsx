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
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1px',
    display: 'block',
    padding: '16px 0',
    borderBottom: '1px solid #e5e5e5'
  })

  const linkStyleDesktop = (path) => ({
    color: isActive(path) ? '#00a8e8' : '#000000',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1px'
  })

  return (
    <nav style={styles.nav}>
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
          style={styles.burgerButton}
          aria-label="Меню"
        >
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#000000',
            margin: '5px 0',
            transition: '0.3s',
            transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }} />
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#000000',
            margin: '5px 0',
            transition: '0.3s',
            opacity: isOpen ? '0' : '1'
          }} />
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#000000',
            margin: '5px 0',
            transition: '0.3s',
            transform: isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
          }} />
        </button>
      )}

      {/* Мобильное меню */}
      {isMobile && isOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={linkStyle('/')}>ГЛАВНАЯ</Link>
          <Link to="/services" style={linkStyle('/services')}>УСЛУГИ</Link>
          <Link to="/methodology" style={linkStyle('/methodology')}>МЕТОДОЛОГИЯ</Link>
          <Link to="/cases" style={linkStyle('/cases')}>КЕЙСЫ</Link>
          <Link to="/faq" style={linkStyle('/faq')}>FAQ</Link>
          <Link to="/glossary" style={linkStyle('/glossary')}>ГЛОССАРИЙ</Link>
          <Link to="/audit" style={{...styles.linkButton, display: 'block', textAlign: 'center', marginTop: '20px'}}>AI-АУДИТ</Link>
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
    padding: '24px 40px', 
    borderBottom: '2px solid #000000', 
    backgroundColor: '#ffffff', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100 
  },
  logo: { 
    fontSize: '28px', 
    fontWeight: '900', 
    color: '#000000', 
    letterSpacing: '2px',
    textDecoration: 'none'
  },
  logoBlue: { color: '#00a8e8' },
  navLinks: { 
    display: 'flex', 
    gap: '20px', 
    alignItems: 'center', 
    flexWrap: 'wrap' 
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
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderBottom: '2px solid #000000',
    padding: '20px 40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }
}
