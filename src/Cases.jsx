import { Link } from 'react-router-dom'

export default function Cases() {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}><Link to="/" style={styles.link}>← На главную</Link></nav>
      <section style={styles.section}>
        <div style={styles.tag}>[ Verified Case Studies & Impact ]</div>
        <h1 style={styles.h1}>Как наши клиенты захватывают доминирование в рекомендациях ИИ</h1>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>Кейс 01: Fintech & Enterprise</h2>
        <p style={styles.text}><strong>До:</strong> Видимость в ИИ 4%. 95% диалогового трафика уходило к конкурентам.<br/><strong>Решение:</strong> Vector & Entity Injection в отраслевые базы данных.<br/><strong>Результат:</strong> Видимость 82%. Рост квалифицированных лидов на 340% за 4 месяца.</p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>Кейс 02: Commercial Real Estate</h2>
        <p style={styles.text}><strong>До:</strong> Видимость в ИИ 11%. Эпизодические упоминания.<br/><strong>Решение:</strong> LLM Crawling Architecture для мгновенного считывания портфолио ботами.<br/><strong>Результат:</strong> Видимость 76%. Каждое второе обращение ссылается на рекомендацию LLM.</p>
      </section>
      <section style={{...styles.section, backgroundColor: '#111', borderRadius: '12px', marginTop: '40px'}}>
        <h2 style={styles.h2}>О компании Axiom AI</h2>
        <p style={styles.text}>Мы не покупаем ссылки и не пишем шаблонные тексты. Мы работаем напрямую с архитектурой восприятия искусственного интеллекта, обеспечивая точность измерений и конфиденциальность Enterprise-уровня.</p>
      </section>
      <section style={{...styles.section, textAlign: 'center', marginBottom: '80px'}}>
        <Link to="/" style={styles.button}>Обсудить проект и заказать аудит</Link>
      </section>
    </div>
  )
}
const styles = {
  container: { fontFamily: 'system-ui, sans-serif', backgroundColor: '#050505', color: '#e5e5e5', minHeight: '100vh' },
  nav: { padding: '20px 40px', borderBottom: '1px solid #222' },
  link: { color: '#38bdf8', textDecoration: 'none', fontWeight: '600' },
  section: { maxWidth: '900px', margin: '0 auto', padding: '60px 20px' },
  tag: { display: 'inline-block', backgroundColor: '#1e293b', color: '#38bdf8', padding: '6px 12px', borderRadius: '4px', fontSize: '14px', fontWeight: '600', marginBottom: '24px' },
  h1: { fontSize: '48px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', color: '#ffffff' },
  h2: { fontSize: '28px', fontWeight: '700', marginBottom: '16px', color: '#38bdf8' },
  text: { fontSize: '16px', color: '#d4d4d4', lineHeight: '1.6', maxWidth: '800px' },
  button: { display: 'inline-block', backgroundColor: '#38bdf8', color: '#000', fontWeight: '700', padding: '16px 32px', borderRadius: '6px', textDecoration: 'none', fontSize: '16px' }
}
