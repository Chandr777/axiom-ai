import Navbar from './Navbar'

const questions = [
  {
    question: 'Что такое GEO (Generative Engine Optimization)?',
    answer:
      'GEO — это оптимизация присутствия бренда в ответах генеративных языковых моделей, таких как ChatGPT, Claude и Perplexity. В отличие от классического SEO, GEO уделяет внимание тому, как модель понимает компанию, её продукты и связи с другими сущностями.',
  },
  {
    question: 'Чем GEO отличается от классического SEO?',
    answer:
      'Классическое SEO в первую очередь работает с видимостью страниц в поисковой выдаче. GEO направлено на то, чтобы информация о бренде была понятной, согласованной и доступной для систем, которые формируют готовые ответы и рекомендации.',
  },
  {
    question: 'Что входит в диагностику AI-присутствия?',
    answer:
      'Описанная на сайте диагностика включает промт-моделирование, анализ точности сведений о продуктах, ценах, регионах и уникальном предложении, а также сравнение доли рекомендаций бренда с конкурентами.',
  },
  {
    question: 'Как проходит работа Axiom AI?',
    answer:
      'Методология состоит из трёх этапов: диагностика присутствия в языковых моделях; инженерия данных, сущностей и связей; мониторинг краулинга и повторные измерения видимости.',
  },
  {
    question: 'Какие технологии и источники учитываются?',
    answer:
      'На страницах Axiom AI описаны языковые модели ChatGPT, Claude, Perplexity и Gemini, механизмы RAG, графы знаний, структурированные данные JSON-LD и внешние отраслевые источники.',
  },
  {
    question: 'Зачем сайту robots.txt и структурированные данные?',
    answer:
      'robots.txt публикует правила доступа для совместимых роботов, а JSON-LD помогает программам распознавать сведения об организации в структурированном виде. Эти файлы улучшают техническую доступность информации, но сами по себе не гарантируют включение бренда в ответы конкретной модели.',
  },
]

export default function FAQ() {
  return (
    <div style={styles.container}>
      <Navbar />

      <main>
        <section style={styles.intro}>
          <div style={styles.tag}>[ GEO / AI VISIBILITY FAQ ]</div>
          <h1 style={styles.h1}>Частые вопросы о GEO и видимости в ИИ</h1>
          <p style={styles.subtitle}>
            Краткие ответы о генеративной оптимизации, диагностике AI-присутствия и технической
            доступности информации о бренде.
          </p>
        </section>

        <section style={styles.questions} aria-label="Частые вопросы">
          {questions.map((item, index) => (
            <details key={item.question} style={styles.item}>
              <summary style={styles.question}>
                <span style={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                {item.question}
              </summary>
              <p style={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </section>
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} AXIOM AI. Architecture of Generative Dominance.</p>
      </footer>
    </div>
  )
}

const styles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh',
  },
  intro: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '80px 24px 48px',
    textAlign: 'center',
  },
  tag: {
    display: 'inline-block',
    backgroundColor: '#000000',
    color: '#00a8e8',
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '700',
    marginBottom: '32px',
    letterSpacing: '2px',
  },
  h1: {
    fontSize: 'clamp(30px, 5vw, 56px)',
    fontWeight: '900',
    lineHeight: '1.08',
    margin: '0 0 24px',
    color: '#000000',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: '18px',
    color: '#333333',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  questions: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 24px 80px',
  },
  item: {
    border: '2px solid #000000',
    marginBottom: '16px',
    padding: '24px',
    backgroundColor: '#ffffff',
  },
  question: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '16px',
    cursor: 'pointer',
    fontSize: '18px',
    lineHeight: '1.5',
    fontWeight: '800',
    listStyle: 'none',
  },
  number: {
    color: '#00a8e8',
    fontSize: '13px',
    letterSpacing: '1px',
    flexShrink: 0,
  },
  answer: {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '1.7',
    marginTop: '20px',
    paddingLeft: '38px',
  },
  footer: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666666',
    fontSize: '13px',
    borderTop: '2px solid #000000',
    marginTop: '40px',
    fontWeight: '600',
  },
}
