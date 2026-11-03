import { Link } from 'react-router-dom'

export default function Glossary() {
  const terms = [
    { term: 'GEO (Generative Engine Optimization)', def: 'Оптимизация присутствия бренда в ответах генеративных языковых моделей (ChatGPT, Claude, Perplexity). В отличие от SEO, работает не с поисковой выдачей, а с векторными базами знаний ИИ.' },
    { term: 'LLM (Large Language Model)', def: 'Большая языковая модель — нейросеть, обученная на огромных массивах текста (GPT-4, Claude, Gemini). Именно эти модели формируют рекомендации пользователям.' },
    { term: 'RAG (Retrieval-Augmented Generation)', def: 'Архитектура, при которой языковая модель перед генерацией ответа извлекает актуальные данные из внешних источников. Ключевой механизм, через который ИИ «узнает» о вашем бренде.' },
    { term: 'Векторное пространство (Vector Space)', def: 'Математическое пространство, в котором слова, понятия и сущности представлены как векторы. Семантическая близость брендов определяется расстоянием между их векторами.' },
    { term: 'Граф знаний (Knowledge Graph)', def: 'Структурированное представление сущностей и связей между ними. Языковые модели используют графы знаний для формирования ответов о компаниях, продуктах и экспертах.' },
    { term: 'Entity Injection', def: 'Процесс внедрения структурированного описания бренда (паспорта сущности) в источники, которые парсят языковые модели при обучении и дообучении.' },
    { term: 'Краулер ИИ (AI Crawler)', def: 'Специализированный бот (GPTBot, ClaudeBot, PerplexityBot), который сканирует веб-ресурсы для обучения и актуализации знаний языковой модели.' },
    { term: 'JSON-LD', def: 'Формат машиночитаемой разметки данных на сайте. Позволяет языковым моделям извлекать структурированную информацию о компании без визуального парсинга.' },
    { term: 'Токеновый шум (Token Noise)', def: 'Избыточные элементы на сайте (реклама, тяжелые скрипты, SEO-спам), которые искажают восприятие контента языковой моделью при парсинге.' },
    { term: 'AI-Footprint', def: 'Совокупность цифрового следа бренда в базах знаний языковых моделей. Определяет, как ИИ «видит» и рекомендует вашу компанию.' },
    { term: 'Determinism Guarantee', def: 'Принцип детерминированной воспроизводимости результатов аудита. При повторных запросах система выдает стабильный верифицированный срез данных.' },
    { term: 'Foundational Model', def: 'Базовая языковая модель, на которой строятся приложения (OpenAI GPT, Anthropic Claude, Google Gemini). Именно их алгоритмы мы оптимизируем.' }
  ]

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.logo}>AXIOM <span style={styles.logoBlue}>AI</span></div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>ГЛАВНАЯ</Link>
          <Link to="/services" style={styles.link}>УСЛУГИ</Link>
          <Link to="/methodology" style={styles.link}>МЕТОДОЛОГИЯ</Link>
          <Link to="/cases" style={styles.link}>КЕЙСЫ</Link>
          <Link to="/faq" style={styles.link}>FAQ</Link>
          <Link to="/glossary" style={styles.linkActive}>ГЛОССАРИЙ</Link>
          <Link to="/audit" style={styles.linkButton}>AI-АУДИТ</Link>
        </div>
      </nav>

      <section style={styles.section}>
        <div style={styles.tag}>[ Technical Glossary ]</div>
        <h1 style={styles.h1}>Глоссарий терминов GEO</h1>
        <p style={styles.subtitle}>Точные определения ключевых понятий генеративной оптимизации.</p>
      </section>

      <section style={styles.glossarySection}>
        {terms.map((item, index) => (
          <div key={index} style={styles.termBlock}>
            <h2 style={styles.term}>{item.term}</h2>
            <p style={styles.definition}>{item.def}</p>
          </div>
        ))}
      </section>

      <section style={{...styles.section, backgroundColor: '#000000', color: '#ffffff'}}>
        <h2 style={styles.h2Dark}>Готовы говорить на одном языке с алгоритмами?</h2>
        <Link to="/audit" style={styles.buttonBlue}>ЗАКАЗАТЬ AI-АУДИТ</Link>
      </section>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} AXIOM AI. Architecture of Generative Dominance.</p>
      </footer>
    </div>
  )
}

const styles = {
  container: { fontFamily: 'system-ui, sans-serif', backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px', borderBottom: '2px solid #000000', backgroundColor: '#ffffff', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontSize: '28px', fontWeight: '900', color: '#000000', letterSpacing: '2px' },
  logoBlue: { color: '#00a8e8' },
  navLinks: { display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' },
  link: { color: '#000000', textDecoration: 'none', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' },
  linkActive: { color: '#00a8e8', textDecoration: 'none', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' },
  linkButton: { backgroundColor: '#000000', color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: '700', padding: '10px 20px', letterSpacing: '1px' },
  section: { maxWidth: '1100px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' },
  glossarySection: { maxWidth: '1100px', margin: '0 auto', padding: '0 40px 80px' },
  tag: { display: 'inline-block', backgroundColor: '#000000', color: '#00a8e8', padding: '8px 16px', fontSize: '12px', fontWeight: '700', marginBottom: '32px', letterSpacing: '2px' },
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px', color: '#000000', textTransform: 'uppercase' },
  h2Dark: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '24px', color: '#ffffff', textTransform: 'uppercase' },
  subtitle: { fontSize: '18px', color: '#333333', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' },
  termBlock: { padding: '32px', border: '2px solid #000000', marginBottom: '20px', backgroundColor: '#ffffff' },
  term: { fontSize: '18px', fontWeight: '900', color: '#00a8e8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' },
  definition: { fontSize: '16px', color: '#000000', lineHeight: '1.7' },
  buttonBlue: { display: 'inline-block', backgroundColor: '#00a8e8', color: '#000000', fontWeight: '800', padding: '20px 40px', textDecoration: 'none', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '24px' },
  footer: { textAlign: 'center', padding: '40px 20px', color: '#666666', fontSize: '13px', borderTop: '2px solid #000000', marginTop: '80px', fontWeight: '600' }
}
