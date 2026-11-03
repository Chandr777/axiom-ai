import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Services from './Services'
import Methodology from './Methodology'
import Cases from './Cases'

function Home() {
  const [formData, setFormData] = useState({ company_name: '', website: '', contact: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация отправки
    setStatus('success')
    setFormData({ company_name: '', website: '', contact: '' })
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <span style={styles.logo}>AXIOM AI</span>
        <div style={styles.navLinks}>
          <Link to="/services" style={styles.link}>Услуги</Link>
          <Link to="/methodology" style={styles.link}>Методология</Link>
          <Link to="/cases" style={styles.link}>Кейсы</Link>
        </div>
      </nav>

      <section style={styles.section}>
        <div style={styles.tag}>[ Generative Engine Optimization / AEO Enterprise Protocol ]</div>
        <h1 style={styles.h1}>Ваши клиенты больше не ищут вас через Google. Они спрашивают у ИИ.</h1>
        <p style={styles.subtitle}>Мы встраиваем ваш бизнес в алгоритмы генеративного поиска так, чтобы для ИИ вы были единственным логичным выбором.</p>
        <a href="#audit" style={styles.button}>Инициировать аудит AI-присутствия</a>
      </section>

      <section id="audit" style={{...styles.section, backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}}>
        <h2 style={styles.h2}>AI-Footprint Diagnostic</h2>
        {status === 'success' ? (
          <div style={styles.successMessage}>✅ Заявка принята. Отчет формируется на основе верифицированного среза.</div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input name="company_name" placeholder="Юридическое лицо / Бренд" value={formData.company_name} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required style={styles.input} />
            <input name="website" placeholder="Корпоративный домен" value={formData.website} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required style={styles.input} />
            <input name="contact" placeholder="Email / Telegram ЛПР" value={formData.contact} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required style={styles.input} />
            <button type="submit" disabled={status === 'loading'} style={styles.button}>{status === 'loading' ? 'Обработка...' : 'Запросить закрытый отчет'}</button>
          </form>
        )}
      </section>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Axiom AI. Architecture of Generative Dominance.</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/cases" element={<Cases />} />
      </Routes>
    </Router>
  )
}

const styles = {
  container: { fontFamily: 'system-ui, sans-serif', backgroundColor: '#050505', color: '#e5e5e5', minHeight: '100vh' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #222', maxWidth: '1200px', margin: '0 auto' },
  logo: { fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '2px' },
  navLinks: { display: 'flex', gap: '24px' },
  link: { color: '#a3a3a3', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'color 0.2s' },
  section: { maxWidth: '900px', margin: '0 auto', padding: '80px 20px', textAlign: 'center' },
  tag: { display: 'inline-block', backgroundColor: '#1e293b', color: '#38bdf8', padding: '6px 12px', borderRadius: '4px', fontSize: '14px', fontWeight: '600', marginBottom: '24px' },
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', color: '#ffffff' },
  h2: { fontSize: '32px', fontWeight: '700', marginBottom: '20px', color: '#ffffff' },
  subtitle: { fontSize: '18px', color: '#a3a3a3', maxWidth: '700px', margin: '0 auto 32px' },
  button: { display: 'inline-block', backgroundColor: '#38bdf8', color: '#000', fontWeight: '700', padding: '16px 32px', borderRadius: '6px', textDecoration: 'none', fontSize: '16px', border: 'none', cursor: 'pointer', marginTop: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px', margin: '40px auto 0' },
  input: { padding: '16px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0a0a0a', color: '#fff', fontSize: '16px', outline: 'none' },
  successMessage: { backgroundColor: '#064e3b', color: '#6ee7b7', padding: '20px', borderRadius: '8px', marginTop: '24px', fontWeight: '600' },
  footer: { textAlign: 'center', padding: '40px 20px', color: '#525252', fontSize: '14px', borderTop: '1px solid #111', marginTop: '80px' }
}
