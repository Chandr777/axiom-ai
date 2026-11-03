import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Services() {
  return (
    <div style={styles.container}>
      <Navbar />

      <section style={styles.section}>
        <div style={styles.tag}>[ Enterprise-Grade GEO Solutions ]</div>
        <h1 style={styles.h1}>Инженерия вашего бренда в алгоритмах языковых моделей</h1>
        <p style={styles.subtitle}>Нейросети не ранжируют сайты — они оперируют сущностями, векторными связями и графами знаний.</p>
      </section>

      <section style={styles.serviceBlock}>
        <div style={styles.marker}>[ Service Module 01 ]</div>
        <h2 style={styles.h2}>Vector & Entity Injection</h2>
        <p style={styles.text}><strong>Проблема:</strong> Большинство бизнесов для языковых моделей — «слепые зоны».</p>
        <p style={styles.text}><strong>Решение:</strong> Паспортизация сущности, внедрение в базы знаний, векторное позиционирование.</p>
        <p style={styles.result}><strong>Результат:</strong> ИИ воспринимает ваш бренд как признанного индустриального лидера.</p>
      </section>

      <section style={{...styles.serviceBlock, backgroundColor: '#000000', color: '#ffffff'}}>
        <div style={styles.markerDark}>[ Service Module 02 ]</div>
        <h2 style={styles.h2Dark}>LLM Crawling Architecture</h2>
        <p style={styles.textDark}><strong>Проблема:</strong> Стандартные сайты запутывают поисковых роботов нового поколения (GPTBot, PerplexityBot).</p>
        <p style={styles.textDark}><strong>Решение:</strong> API-слои для краулеров, JSON-LD нового поколения, устранение токенового шума.</p>
        <p style={styles.resultDark}><strong>Результат:</strong> Коммерческая информация считывается ИИ мгновенно и без искажений.</p>
      </section>

      <section style={styles.serviceBlock}>
        <div style={styles.marker}>[ Service Module 03 ]</div>
        <h2 style={styles.h2}>Multi-Source Citation Engineering</h2>
        <p style={styles.text}><strong>Проблема:</strong> Нейросети не верят сайтам компаний — они верят перекрестным источникам.</p>
        <p style={styles.text}><strong>Решение:</strong> Карта цитирования, посев экспертного следа, управление консенсусом данных.</p>
        <p style={styles.result}><strong>Результат:</strong> Железобетонный консенсус: для ИИ вы — безальтернативный эксперт.</p>
      </section>

      <section style={{...styles.section, textAlign: 'center', marginBottom: '80px'}}>
        <Link to="/audit" style={styles.buttonBlack}>ЗАПРОСИТЬ ТЕХНИЧЕСКИЙ БРИФ</Link>
      </section>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} AXIOM AI. Architecture of Generative Dominance.</p>
      </footer>
    </div>
  )
}

const styles = {
  container: { fontFamily: 'system-ui, sans-serif', backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh' },
  section: { maxWidth: '1100px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' },
  serviceBlock: { maxWidth: '1100px', margin: '0 auto', padding: '80px 40px', borderTop: '2px solid #000000' },
  tag: { display: 'inline-block', backgroundColor: '#000000', color: '#00a8e8', padding: '8px 16px', fontSize: '12px', fontWeight: '700', marginBottom: '32px', letterSpacing: '2px' },
  marker: { fontSize: '12px', fontWeight: '800', color: '#00a8e8', letterSpacing: '2px', marginBottom: '16px' },
  markerDark: { fontSize: '12px', fontWeight: '800', color: '#00a8e8', letterSpacing: '2px', marginBottom: '16px' },
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px', color: '#000000', textTransform: 'uppercase' },
  h2: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '24px', color: '#000000', textTransform: 'uppercase' },
  h2Dark: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '24px', color: '#ffffff', textTransform: 'uppercase' },
  subtitle: { fontSize: '18px', color: '#333333', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' },
  text: { fontSize: '16px', color: '#000000', lineHeight: '1.7', maxWidth: '900px', marginBottom: '16px' },
  textDark: { fontSize: '16px', color: '#cccccc', lineHeight: '1.7', maxWidth: '900px', marginBottom: '16px' },
  result: { fontSize: '16px', color: '#00a8e8', lineHeight: '1.7', fontWeight: '700', marginTop: '24px', padding: '20px', border: '2px solid #00a8e8' },
  resultDark: { fontSize: '16px', color: '#00a8e8', lineHeight: '1.7', fontWeight: '700', marginTop: '24px', padding: '20px', border: '2px solid #00a8e8' },
  buttonBlack: { display: 'inline-block', backgroundColor: '#000000', color: '#ffffff', fontWeight: '800', padding: '20px 40px', textDecoration: 'none', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' },
  footer: { textAlign: 'center', padding: '40px 20px', color: '#666666', fontSize: '13px', borderTop: '2px solid #000000', marginTop: '80px', fontWeight: '600' }
}
