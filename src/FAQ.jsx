import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function FAQ() {
  const faqs = [
    { q: 'Чем GEO отличается от классического SEO?', a: 'SEO оптимизирует сайт под алгоритмы поисковых машин (Google, Яндекс). GEO (Generative Engine Optimization) встраивает ваш бренд в векторные базы знаний языковых моделей (OpenAI, Anthropic, Google), чтобы ИИ рекомендовал вас напрямую в диалогах с пользователями.' },
    { q: 'Через сколько времени будут видны результаты?', a: 'Первичный срез видимости — в течение 48 часов после старта. Значимые изменения в рекомендациях LLM — через 4–8 недель системной работы. Устойчивое доминирование — через 3–6 месяцев.' },
    { q: 'Можно ли гарантировать попадание в топ-1 ответа ChatGPT?', a: 'Мы гарантируем измеримый рост индекса видимости и детерминированную методологию. Конкретная позиция зависит от конкурентной плотности ниши, но наши кейсы показывают рост с 4% до 82% видимости.' },
    { q: 'Что такое AI-Footprint Diagnostic?', a: 'Это многофакторный программный срез индексации вашего бренда в коммерческих сценариях топ-5 языковых моделей. Мы не «оцениваем сайт по шкале от 1 до 10» — мы показываем реальные позиции в генеративной выдаче.' },
    { q: 'Работаете ли вы с малым бизнесом?', a: 'Наша методология рассчитана на компании с высоким средним чеком и сложным продуктом: B2B-сервисы, enterprise-решения, премиальный сегмент. Для локального малого бизнеса классическое SEO пока эффективнее.' },
    { q: 'Как обеспечивается конфиденциальность данных?', a: 'Мы работаем по стандартам Enterprise-уровня: NDA на старте, изолированные контуры данных, отсутствие передачи информации третьим лицам. Все метрики хранятся в зашифрованном виде.' },
    { q: 'Почему результаты аудита стабильны при повторных запросах?', a: 'Мы используем принцип детерминированной воспроизводимости (Determinism Guarantee). Система фиксирует векторный срез на момент запроса и при повторных обращениях отдает верифицированный стабильный результат.' }
  ]

  return (
    <div style={styles.container}>
      <Navbar />

      <section style={styles.section}>
        <div style={styles.tag}>[ Frequently Asked Questions ]</div>
        <h1 style={styles.h1}>Ответы на ключевые вопросы</h1>
      </section>

      <section style={styles.faqSection}>
        {faqs.map((faq, index) => (
          <div key={index} style={index % 2 === 0 ? styles.faqItem : styles.faqItemDark}>
            <h2 style={index % 2 === 0 ? styles.question : styles.questionDark}>{faq.q}</h2>
            <p style={index % 2 === 0 ? styles.answer : styles.answerDark}>{faq.a}</p>
          </div>
        ))}
      </section>

      <section style={{...styles.section, backgroundColor: '#000000', color: '#ffffff'}}>
        <h2 style={styles.h2Dark}>Остались вопросы?</h2>
        <p style={styles.textDark}>Задайте их напрямую нашим инженерам на стратегическом брифинге.</p>
        <Link to="/audit" style={styles.buttonBlue}>ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ</Link>
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
  faqSection: { maxWidth: '1100px', margin: '0 auto', padding: '0 40px 80px' },
  tag: { display: 'inline-block', backgroundColor: '#000000', color: '#00a8e8', padding: '8px 16px', fontSize: '12px', fontWeight: '700', marginBottom: '32px', letterSpacing: '2px' },
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px', color: '#000000', textTransform: 'uppercase' },
  h2Dark: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '24px', color: '#ffffff', textTransform: 'uppercase' },
  textDark: { fontSize: '18px', color: '#cccccc', maxWidth: '800px', margin: '0 auto 32px', lineHeight: '1.6' },
  faqItem: { padding: '40px', border: '2px solid #000000', marginBottom: '24px', backgroundColor: '#ffffff' },
  faqItemDark: { padding: '40px', border: '2px solid #00a8e8', marginBottom: '24px', backgroundColor: '#000000' },
  question: { fontSize: '20px', fontWeight: '800', color: '#000000', marginBottom: '16px', textTransform: 'uppercase' },
  questionDark: { fontSize: '20px', fontWeight: '800', color: '#00a8e8', marginBottom: '16px', textTransform: 'uppercase' },
  answer: { fontSize: '16px', color: '#333333', lineHeight: '1.7' },
  answerDark: { fontSize: '16px', color: '#cccccc', lineHeight: '1.7' },
  buttonBlue: { display: 'inline-block', backgroundColor: '#00a8e8', color: '#000000', fontWeight: '800', padding: '20px 40px', textDecoration: 'none', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '24px' },
  footer: { textAlign: 'center', padding: '40px 20px', color: '#666666', fontSize: '13px', borderTop: '2px solid #000000', marginTop: '80px', fontWeight: '600' }
}
