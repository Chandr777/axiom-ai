import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}><Link to="/" style={styles.link}>← На главную</Link></nav>
      <section style={styles.section}>
        <div style={styles.tag}>[ Enterprise-Grade GEO Solutions ]</div>
        <h1 style={styles.h1}>Инженерия вашего бренда в алгоритмах языковых моделей</h1>
        <p style={styles.subtitle}>Нейросети оперируют сущностями, векторными связями и графами знаний. Мы пересобираем цифровой профиль вашей компании.</p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>01. Vector & Entity Injection</h2>
        <p style={styles.text}>Создаем машиночитаемое досье компании и интегрируем данные в источники, которые используют foundational models при обучении.</p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>02. LLM Crawling Architecture</h2>
        <p style={styles.text}>Развертывание легковесных машиночитаемых представлений сайта и внедрение глубоких схем JSON-LD нового поколения.</p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>03. Multi-Source Citation Engineering</h2>
        <p style={styles.text}>Формирование потока качественных упоминаний на площадках, которые сканируются поисковыми движками ИИ в реальном времени.</p>
      </section>
      <section style={{...styles.section, textAlign: 'center', marginBottom: '80px'}}>
        <Link to="/" style={styles.button}>Запросить технический бриф</Link>
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
  subtitle: { fontSize: '18px', color: '#a3a3a3', maxWidth: '700px' },
  text: { fontSize: '16px', color: '#d4d4d4', lineHeight: '1.6', maxWidth: '800px' },
  button: { display: 'inline-block', backgroundColor: '#38bdf8', color: '#000', fontWeight: '700', padding: '16px 32px', borderRadius: '6px', textDecoration: 'none', fontSize: '16px' }
}
