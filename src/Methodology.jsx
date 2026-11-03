import { Link } from 'react-router-dom'

export default function Methodology() {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}><Link to="/" style={styles.link}>← На главную</Link></nav>
      <section style={styles.section}>
        <div style={styles.tag}>[ Algorithmic R&D Protocol ]</div>
        <h1 style={styles.h1}>Как мы измеряем и гарантируем доминирование в ИИ</h1>
        <p style={styles.subtitle}>Генеративный поиск — это строгая математика векторов, RAG-контекстов и весов языковых моделей.</p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>Этап 1: Рентгенография векторного пространства</h2>
        <p style={styles.text}>Промт-моделирование и анализ энтропии бренда. Мы выявляем «галлюцинации» ИИ о вашей компании и оцениваем долю рекомендаций.</p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>Этап 2: Инженерия графов знаний</h2>
        <p style={styles.text}>Семантическая паспортизация и устранение цифрового шума. Упаковка данных в форматы, оптимизированные для RAG-извлечения.</p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>Этап 3: Синхронизация с краулерами</h2>
        <p style={styles.text}>Непрерывный мониторинг того, как боты (GPTBot, ClaudeBot) сканируют инфраструктуру, и реактивное обновление профиля.</p>
      </section>
      <section style={{...styles.section, textAlign: 'center', marginBottom: '80px'}}>
        <Link to="/" style={styles.button}>Запросить презентацию методологии</Link>
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
