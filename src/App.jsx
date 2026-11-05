import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Services from './Services'
import Methodology from './Methodology'
import Cases from './Cases'
import Pricing from './Pricing'
import FAQ from './FAQ'
import Glossary from './Glossary'
import heroVideo from './assets/hero-video.mp4'

function Home() {
  const [formData, setFormData] = useState({ company_name: '', website: '', contact: '' })
  const [status, setStatus] = useState('idle')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise(resolve => setTimeout(resolve, 1000))
    setStatus('success')
    setFormData({ company_name: '', website: '', contact: '' })
  }

  return (
    <div style={styles.container}>
      <Navbar />

      <section style={{
        ...styles.heroSection,
        height: isMobile ? 'auto' : '100vh',
        padding: isMobile ? '40px 16px' : '80px 40px'
      }}>
        <video autoPlay muted loop playsInline style={styles.video}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div style={styles.heroOverlay}>
          <div style={{
            ...styles.heroContent,
            padding: isMobile ? '20px 16px' : '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // ЖЕСТКОЕ ЦЕНТРИРОВАНИЕ ВСЕГО КОНТЕНТА
            textAlign: 'center'
          }}>
            <h1 style={{
              ...styles.h1,
              fontSize: isMobile ? '26px' : 'clamp(32px, 5vw, 56px)',
              lineHeight: isMobile ? '1.2' : '1.05',
              textAlign: 'center'
            }}>
              Поисковая выдача умерла. Наступила эпоха безальтернативных рекомендаций.
            </h1>
            <p style={{
              ...styles.subtitle,
              fontSize: isMobile ? '15px' : '18px',
              textAlign: 'center',
              maxWidth: isMobile ? '100%' : '800px'
            }}>
              Пока ваш отдел маркетинга сжигает бюджеты на классическое SEO, ChatGPT, Perplexity и Claude перехватили контроль над принятием решений. Мы встраиваем ваш бизнес в алгоритмы генеративного поиска так, чтобы для ИИ вы были единственным логичным выбором.
            </p>
            <div style={{
              ...styles.metrics,
              gap: isMobile ? '24px' : '60px',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center'
            }}>
              <div style={{...styles.metricItem, textAlign: 'center'}}>
                <strong style={{...styles.bigNumber, fontSize: isMobile ? '36px' : '48px'}}>0</strong>
                кликов в классической выдаче для тех, кто не попал в топ-1 ответа LLM.
              </div>
              <div style={{...styles.metricItem, textAlign: 'center'}}>
                <strong style={{...styles.bigNumber, fontSize: isMobile ? '36px' : '48px'}}>100%</strong>
                монополия внимания в диалоговых интерфейсах.
              </div>
            </div>
            <a href="#audit" style={{
              ...styles.button,
              padding: isMobile ? '14px 20px' : '20px 40px',
              fontSize: isMobile ? '13px' : '16px',
              width: isMobile ? '100%' : 'auto',
              maxWidth: '400px',
              boxSizing: 'border-box',
              display: 'inline-block',
              textAlign: 'center'
            }}>
              ИНИЦИИРОВАТЬ АУДИТ AI-ПРИСУТСТВИЯ
            </a>
          </div>
        </div>
      </section>

      <section style={{
        ...styles.sectionDark,
        padding: isMobile ? '40px 16px' : '80px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          ...styles.h2Dark,
          fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 44px)'
        }}>ВЧЕРА VS СЕГОДНЯ</h2>
        <div style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: isMobile ? '16px' : '32px'
        }}>
          <div style={{
            ...styles.cardDark,
            padding: isMobile ? '24px 16px' : '40px'
          }}>
            <h3 style={styles.h3Dark}>КЛАССИЧЕСКИЙ ПОИСК</h3>
            <p style={styles.textDark}>Пользователь получает 20 ссылок, сравнивает цены, читает отзывы. У вас есть шанс.</p>
            <p style={styles.warning}>❌ Устаревшая модель</p>
          </div>
          <div style={{
            ...styles.cardDark,
            padding: isMobile ? '24px 16px' : '40px'
          }}>
            <h3 style={styles.h3Dark}>ГЕНЕРАТИВНЫЙ ПОИСК</h3>
            <p style={styles.textDark}>ИИ анализирует терабайты данных и выдает одну-единственную рекомендацию.</p>
            <p style={styles.success}>✅ Безальтернативное решение</p>
          </div>
        </div>
      </section>

      <section id="audit" style={{
        ...styles.section,
        padding: isMobile ? '40px 16px' : '80px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          ...styles.h1,
          fontSize: isMobile ? '22px' : 'clamp(28px, 4vw, 44px)',
          color: '#000000',
          textAlign: 'center'
        }}>
          AI-FOOTPRINT DIAGNOSTIC: РЕНТГЕНОГРАФИЯ ВАШЕГО ЦИФРОВОГО СЛЕДА
        </h2>
        <p style={{
          ...styles.subtitle,
          color: '#333333',
          fontSize: isMobile ? '14px' : '18px',
          textAlign: 'center'
        }}>
          Мы не предлагаем «оценить сайт по шкале от 1 до 10». Мы проводим многофакторный программный срез индексации вашего бренда в коммерческих сценариях топ-5 языковых моделей.
        </p>
        
        {status === 'success' ? (
          <div style={styles.successMessage}>✅ Заявка принята. Закрытый отчет формируется на основе верифицированного среза.</div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            ...styles.form,
            padding: isMobile ? '0 8px' : '0',
            alignItems: 'center'
          }}>
            <input name="company_name" placeholder="Юридическое лицо / Бренд" value={formData.company_name} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required style={styles.input} />
            <input name="website" placeholder="Корпоративный домен" value={formData.website} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required style={styles.input} />
            <input name="contact" placeholder="Email / Telegram ЛПР" value={formData.contact} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required style={styles.input} />
            <button type="submit" disabled={status === 'loading'} style={{
              ...styles.buttonBlack,
              padding: isMobile ? '16px 20px' : '20px 40px',
              fontSize: isMobile ? '12px' : '14px'
            }}>
              {status === 'loading' ? 'ОБРАБОТКА...' : 'ЗАПРОСИТЬ ЗАКРЫТЫЙ ОТЧЕТ'}
            </button>
          </form>
        )}
        <p style={{
          ...styles.smallText,
          padding: isMobile ? '0 8px' : '0',
          textAlign: 'center'
        }}>🔒 Гарантия точности: при повторных запросах система выдает верифицированный стабильный результат.</p>
      </section>

      <footer style={{
        ...styles.footer,
        padding: isMobile ? '24px 16px' : '40px 20px'
      }}>
        <p>© {new Date().getFullYear()} AXIOM AI. Architecture of Generative Dominance.</p>
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
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/audit" element={<Home />} />
      </Routes>
    </Router>
  )
}

const styles = {
  container: { fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh', overflowX: 'hidden' },
  heroSection: { position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', boxSizing: 'border-box' },
  video: { position: 'absolute', top: '50%', left: '50%', minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto', transform: 'translate(-50%, -50%)', zIndex: 1, objectFit: 'cover' },
  heroOverlay: { position: 'relative', zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.75)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  heroContent: { maxWidth: '1100px', width: '100%', boxSizing: 'border-box' },
  section: { maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box' },
  sectionDark: { maxWidth: '1100px', margin: '0 auto', backgroundColor: '#000000', color: '#ffffff', width: '100%', boxSizing: 'border-box' },
  h1: { fontWeight: '900', marginBottom: '32px', color: '#ffffff', textTransform: 'uppercase', margin: '0 auto 32px' },
  h2Dark: { fontWeight: '900', marginBottom: '40px', color: '#ffffff', textTransform: 'uppercase' },
  subtitle: { color: '#cccccc', margin: '0 auto 40px', lineHeight: '1.6' },
  metrics: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' },
  metricItem: { fontSize: '16px', color: '#ffffff', maxWidth: '300px' },
  bigNumber: { color: '#00a8e8', display: 'block', marginBottom: '8px' },
  button: { backgroundColor: '#00a8e8', color: '#000000', fontWeight: '800', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', marginTop: '16px' },
  buttonBlack: { backgroundColor: '#000000', color: '#ffffff', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', width: '100%', maxWidth: '400px', marginTop: '16px' },
  grid: { display: 'grid', marginTop: '32px' },
  cardDark: { backgroundColor: '#111111', border: '2px solid #333333' },
  h3Dark: { fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: '#00a8e8', textTransform: 'uppercase' },
  textDark: { fontSize: '16px', color: '#cccccc', lineHeight: '1.6' },
  warning: { color: '#ff4444', fontWeight: '700', marginTop: '20px', fontSize: '14px' },
  success: { color: '#00a8e8', fontWeight: '700', marginTop: '20px', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px', margin: '40px auto 0' },
  input: { padding: '18px', border: '2px solid #000000', backgroundColor: '#ffffff', color: '#000000', fontSize: '16px', outline: 'none', fontWeight: '600', width: '100%', maxWidth: '400px', boxSizing: 'border-box' },
  successMessage: { backgroundColor: '#00a8e8', color: '#000000', padding: '24px', fontWeight: '800', marginTop: '24px', fontSize: '16px', maxWidth: '400px', margin: '24px auto 0' },
  smallText: { fontSize: '13px', color: '#666666', marginTop: '24px', maxWidth: '700px', margin: '24px auto 0' },
  footer: { textAlign: 'center', color: '#666666', fontSize: '13px', borderTop: '2px solid #000000', marginTop: '80px', fontWeight: '600', width: '100%', boxSizing: 'border-box' }
}
