import { useState } from 'react'
import './App.css' // Можно оставить пустым или удалить, стили уже внутри

function App() {
  const [formData, setFormData] = useState({ company_name: '', website: '', contact: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // ЗАМЕНИТЕ URL на ваш реальный бэкенд, когда он будет развернут
      const response = await fetch('https://api.axiom-ai.su/api/v1/request-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ company_name: '', website: '', contact: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      setStatus('error')
    }
  }

  return (
    <div style={styles.container}>
      {/* Блок 1: Hero Section */}
      <section style={styles.section}>
        <div style={styles.tag}>[ Generative Engine Optimization / AEO Enterprise Protocol ]</div>
        <h1 style={styles.h1}>Ваши клиенты больше не ищут вас через Google. Они спрашивают у ИИ. И нейросеть называет имена ваших конкурентов.</h1>
        <p style={styles.subtitle}>
          Пока ваш отдел маркетинга сжигает бюджеты на классическое SEO, ChatGPT, Perplexity и Claude перехватили контроль над принятием решений. Мы встраиваем ваш бизнес в алгоритмы генеративного поиска так, чтобы для ИИ вы были единственным логичным выбором.
        </p>
        <div style={styles.metrics}>
          <div style={styles.metricItem}><strong>0</strong> кликов в классической выдаче для тех, кто не попал в топ-1 ответа LLM.</div>
          <div style={styles.metricItem}><strong>100%</strong> монополия внимания в диалоговых интерфейсах.</div>
        </div>
        <a href="#audit" style={styles.button}>Инициировать аудит AI-присутствия</a>
      </section>

      {/* Блок 2: The Shift */}
      <section style={{...styles.section, backgroundColor: '#111'}}>
        <h2 style={styles.h2}>Поисковая выдача умерла. Наступила эпоха безальтернативных рекомендаций.</2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.h3}>Вчера (Классический поиск)</h3>
            <p>Пользователь вбивает запрос, получает 20 ссылок, сравнивает цены. У вас есть шанс забрать клиента за счет дизайна или скидки.</p>
            <p style={styles.warning}>❌ Устаревшая модель</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.h3}>Сегодня (Генеративный поиск)</h3>
            <p>Пользователь задает нейросети задачу. ИИ анализирует терабайты данных за секунду и выдает одну-единственную рекомендацию.</p>
            <p style={styles.success}>✅ Безальтернативное решение</p>
          </div>
        </div>
        <p style={styles.boldText}>Если ваш бренд не прошит в векторных базах знаний как индустриальный лидер, для клиента вы не существуете.</p>
      </section>

      {/* Блок 3: Core Technology */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Как мы управляем тем, что думают о вас нейросети</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.h3}>01. Vector & Entity Injection</h3>
            <p>Формируем и внедряем паспорта вашей компании и продуктовые матрицы в структуры данных, которые парсят foundational models.</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.h3}>02. LLM Crawling Architecture</h3>
            <p>Пересборка инфраструктуры сайта на уровень машиночитаемой семантики (JSON-LD нового поколения), чтобы модели считывали преимущества без искажений.</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.h3}>03. Multi-Source Citation</h3>
            <p>Выстраиваем сеть авторитетных упоминаний на платформах, служащих «фундаментом правды» для алгоритмов ИИ.</p>
          </div>
        </div>
      </section>

      {/* Блок 4: Deep Audit Framework (Форма) */}
      <section id="audit" style={{...styles.section, backgroundColor: '#0f172a', border: '1px solid #1e293b'}}>
        <h2 style={styles.h2}>AI-Footprint Diagnostic: Рентгенография вашего цифрового следа</h2>
        <p style={styles.subtitle}>Мы проводим многофакторный программный срез индексации вашего бренда в коммерческих сценариях топ-5 языковых моделей.</p>
        
        {status === 'success' ? (
          <div style={styles.successMessage}>
            ✅ Заявка принята. Закрытый отчет формируется на основе верифицированного среза.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input 
              name="company_name" 
              placeholder="Юридическое лицо / Бренд" 
              value={formData.company_name} 
              onChange={handleChange} 
              required 
              style={styles.input} 
            />
            <input 
              name="website" 
              placeholder="Корпоративный домен (например, company.com)" 
              value={formData.website} 
              onChange={handleChange} 
              required 
              style={styles.input} 
            />
            <input 
              name="contact" 
              placeholder="Корпоративный Email / Telegram ЛПР" 
              value={formData.contact} 
              onChange={handleChange} 
              required 
              style={styles.input} 
            />
            <button type="submit" disabled={status === 'loading'} style={styles.button}>
              {status === 'loading' ? 'Обработка данных...' : 'Запросить закрытый отчет по позициям в ИИ'}
            </button>
            {status === 'error' && <p style={styles.errorText}>Ошибка сети. Проверьте подключение или попробуйте позже.</p>}
          </form>
                )}
        <p style={styles.smallText}>
          🔒 <em>Гарантия точности: При повторных запросах система выдает верифицированный и стабильный результат на основе зафиксированного векторного среза. Никаких случайных флуктуаций.</em>
        </p>
      </section>

      {/* Блок 5 & 6: ROI & Final CTA */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Экономика генеративного присутствия</h2>
        <ul style={styles.list}>
          <li><strong>Высокий чек:</strong> Пользователи из рекомендаций ИИ закрываются на сделку в разы быстрее.</li>
          <li><strong>Защита от конкурентов:</strong> Вы создаете непреодолимый цифровой барьер на годы вперед.</li>
          <li><strong>Иммунитет к алгоритмам:</strong> Семантический авторитет в базах знаний ИИ стабилен и долговечен.</.li>
        </ul>
        <div style={styles.finalCta}>
          <h2 style={styles.h2}>Рынок рекомендаций ИИ формируется прямо сейчас. Места в топе ограничены.</h2>
          <a href="#audit" style={styles.button}>Назначить экспертную сессию</a>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Axiom AI. Architecture of Generative Dominance.</p>
      </footer>
    </div>
  )
}

// Простые встроенные стили для немедленного отображения без настройки CSS
const styles = {
  container: { fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#050505', color: '#e5e5e5', lineHeight: '1.6', margin: 0, padding: 0 },
  section: { maxWidth: '900px', margin: '0 auto', padding: '80px 20px', textAlign: 'center' },
  tag: { display: 'inline-block', backgroundColor: '#1e293b', color: '#38bdf8', padding: '6px 12px', borderRadius: '4px', fontSize: '14px', fontWeight: '600', marginBottom: '24px', letterSpacing: '1px' },
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', color: '#ffffff' },
  h2: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '700', marginBottom: '20px', color: '#ffffff' },
  h3: { fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#38bdf8' },
  subtitle: { fontSize: '18px', color: '#a3a3a3', maxWidth: '700px', margin: '0 auto 32px' },
  metrics: { display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '40px' },
  metricItem: { fontSize: '16px', color: '#d4d4d4' },
  button: { display: 'inline-block', backgroundColor: '#38bdf8', color: '#000', fontWeight: '700', padding: '16px 32px', borderRadius: '6px', textDecoration: 'none', fontSize: '16px', border: 'none', cursor: 'pointer', transition: 'background 0.2s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px', textAlign: 'left' },
  card: { backgroundColor: '#111', padding: '32px', borderRadius: '8px', border: '1px solid #222' },
  warning: { color: '#ef4444', fontWeight: '600', marginTop: '16px' },
  success: { color: '#22c55e', fontWeight: '600', marginTop: '16px' },
  boldText: { fontSize: '20px', fontWeight: '700', color: '#ffffff', marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px', margin: '40px auto 0' },
  input: { padding: '16px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0a0a0a', color: '#fff', fontSize: '16px', outline: 'none' },
  successMessage: { backgroundColor: '#064e3b', color: '#6ee7b7', padding: '20px', borderRadius: '8px', marginTop: '24px', fontWeight: '600' },
  errorText: { color: '#ef4444', marginTop: '8px', fontSize: '14px' },
  smallText: { fontSize: '13px', color: '#737373', marginTop: '24px', maxWidth: '600px', margin: '24px auto 0' },
  list: { textAlign: 'left', maxWidth: '700px', margin: '40px auto', fontSize: '18px', color: '#d4d4d4' },
  finalCta: { marginTop: '60px', padding: '40px', backgroundColor: '#111', borderRadius: '12px', border: '1px solid #222' },
  footer: { textAlign: 'center', padding: '40px 20px', color: '#525252', fontSize: '14px', borderTop: '1px solid #111' }
}

export default App
