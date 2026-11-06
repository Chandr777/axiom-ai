import Navbar from './Navbar'

export default function Cases() {
  return (
    <div style={styles.container}>
      <Navbar />

      <section style={styles.section}>
        <div style={styles.tag}>[ Verified Case Studies & Impact ]</div>
        <h1 style={styles.h1}>Как наши клиенты захватывают доминирование в рекомендациях ИИ</h1>
        <p style={styles.subtitle}>Теория GEO работает только тогда, когда подтверждена цифрами.</p>
      </section>

      <section style={styles.caseBlock}>
        <div style={styles.marker}>[ Case Study 01 / Financial Technology ]</div>
        <h2 style={styles.h2}>Перехват рекомендаций в сегменте корпоративных финансовых сервисов</h2>
        <div style={styles.caseGrid}>
          <div style={styles.caseCard}>
            <h3 style={styles.h3}>ДО ВНЕДРЕНИЯ</h3>
            <p style={styles.text}>Видимость в ИИ: <strong style={styles.blue}>4%</strong><br/>95% диалогового трафика уходило к двум крупным конкурентам.</p>
          </div>
          <div style={styles.caseCard}>
            <h3 style={styles.h3}>РЕШЕНИЕ</h3>
            <p style={styles.text}>Vector & Entity Injection в ключевые отраслевые базы данных. Инженерия цитирования на верифицированных площадках.</p>
          </div>
          <div style={styles.caseCard}>
            <h3 style={styles.h3}>ПОСЛЕ ВНЕДРЕНИЯ</h3>
            <p style={styles.text}>Видимость в ИИ: <strong style={styles.blue}>82%</strong><br/>Рост квалифицированных лидов на <strong style={styles.blue}>340%</strong> за 4 месяца.</p>
          </div>
        </div>
      </section>

      <section style={{...styles.caseBlock, backgroundColor: '#000000', color: '#ffffff'}}>
        <div style={styles.markerDark}>[ Case Study 02 / Commercial Real Estate ]</div>
        <h2 style={styles.h2Dark}>Монополизация выдачи ИИ для застройщика элитных объектов</h2>
        <div style={styles.caseGrid}>
          <div style={styles.caseCardDark}>
            <h3 style={styles.h3Dark}>ДО ВНЕДРЕНИЯ</h3>
            <p style={styles.textDark}>Видимость в ИИ: <strong style={styles.blue}>11%</strong><br/>Эпизодические упоминания в нейтральном ключе.</p>
          </div>
          <div style={styles.caseCardDark}>
            <h3 style={styles.h3Dark}>РЕШЕНИЕ</h3>
            <p style={styles.textDark}>LLM Crawling Architecture для мгновенного считывания портфолио, лицензий и стандартов ботами.</p>
          </div>
          <div style={styles.caseCardDark}>
            <h3 style={styles.h3Dark}>ПОСЛЕ ВНЕДРЕНИЯ</h3>
            <p style={styles.textDark}>Видимость в ИИ: <strong style={styles.blue}>76%</strong><br/>Каждое второе обращение ссылается на рекомендацию LLM.</p>
          </div>
        </div>
      </section>

      <section style={styles.aboutBlock}>
        <h2 style={styles.h2}>О КОМПАНИИ AXIOM AI</h2>
        <p style={styles.textLarge}>Axiom AI создана инженерами и маркетологами нового поколения, которые осознали раньше других: классический digital-маркетинг исчерпал себя. Мы не покупаем ссылки и не пишем шаблонные тексты. Мы работаем напрямую с архитектурой восприятия искусственного интеллекта.</p>
        <div style={styles.principles}>
          <div style={styles.principle}><strong style={styles.blue}>ТОЧНОСТЬ ИЗМЕРЕНИЙ</strong><br/>Только алгоритмические метрики векторного присутствия.</div>
          <div style={styles.principle}><strong style={styles.blue}>ДОЛГОСРОЧНАЯ СТАБИЛЬНОСТЬ</strong><br/>Позиции устойчивы к штормам поисковых алгоритмов.</div>
          <div style={styles.principle}><strong style={styles.blue}>КОНФИДЕНЦИАЛЬНОСТЬ</strong><br/>Работаем по жестким стандартам безопасности данных.</div>
        </div>
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
  caseBlock: { maxWidth: '1100px', margin: '0 auto', padding: '80px 40px', borderTop: '2px solid #000000' },
  aboutBlock: { maxWidth: '1100px', margin: '0 auto', padding: '80px 40px', borderTop: '2px solid #000000' },
  tag: { display: 'inline-block', backgroundColor: '#000000', color: '#00a8e8', padding: '8px 16px', fontSize: '12px', fontWeight: '700', marginBottom: '32px', letterSpacing: '2px' },
  marker: { fontSize: '12px', fontWeight: '800', color: '#00a8e8', letterSpacing: '2px', marginBottom: '16px' },
  markerDark: { fontSize: '12px', fontWeight: '800', color: '#00a8e8', letterSpacing: '2px', marginBottom: '16px' },
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px', color: '#000000', textTransform: 'uppercase' },
  h2: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '32px', color: '#000000', textTransform: 'uppercase' },
  h2Dark: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '32px', color: '#ffffff', textTransform: 'uppercase' },
  h3: { fontSize: '14px', fontWeight: '800', color: '#00a8e8', letterSpacing: '2px', marginBottom: '16px' },
  h3Dark: { fontSize: '14px', fontWeight: '800', color: '#00a8e8', letterSpacing: '2px', marginBottom: '16px' },
  subtitle: { fontSize: '18px', color: '#333333', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', textAlign: 'justify' },
  text: { fontSize: '15px', color: '#000000', lineHeight: '1.7', textAlign: 'justify' },
  textDark: { fontSize: '15px', color: '#cccccc', lineHeight: '1.7', textAlign: 'justify' },
  textLarge: { fontSize: '18px', color: '#000000', lineHeight: '1.7', maxWidth: '900px', margin: '0 auto 40px', textAlign: 'justify' },
  blue: { color: '#00a8e8' },
  caseGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '32px' },
  caseCard: { padding: '32px', border: '2px solid #000000', backgroundColor: '#ffffff' },
  caseCardDark: { padding: '32px', border: '2px solid #00a8e8', backgroundColor: '#111111' },
  principles: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' },
  principle: { padding: '32px', border: '2px solid #000000', fontSize: '15px', lineHeight: '1.6', textAlign: 'justify' },
  footer: { textAlign: 'center', padding: '40px 20px', color: '#666666', fontSize: '13px', borderTop: '2px solid #000000', marginTop: '80px', fontWeight: '600' }
}
