import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Methodology() {
  return (
    <div style={styles.container}>
      <Navbar />

      <section style={styles.section}>
        <div style={styles.tag}>[ Algorithmic R&D Protocol ]</div>
        <h1 style={styles.h1}>Как мы измеряем и гарантируем доминирование в ИИ</h1>
        <p style={styles.subtitle}>Генеративный поиск — это строгая математика векторов, RAG-контекстов и весов языковых моделей.</p>
      </section>

      <section style={styles.phaseBlock}>
        <div style={styles.marker}>[ Phase 01 / Diagnostic ]</div>
        <h2 style={styles.h2}>Многофакторный анализ присутствия в LLM</h2>
        <p style={styles.text}>Прежде чем менять алгоритмы, необходимо понять, в каких именно векторных кластерах языковая модель «теряет» ваш бренд.</p>
        <div style={styles.list}>
          <div style={styles.listItem}><strong>1. Промт-моделирование (Prompt Matrix Simulation):</strong> Прогон сотен вариаций экспертных, транзакционных и рекомендательных запросов через API ведущих LLM.</div>
          <div style={styles.listItem}><strong>2. Анализ энтропии бренда:</strong> Оценка того, насколько точно нейросеть знает ваши продуктовые характеристики, цены, регионы и УТП.</div>
          <div style={styles.listItem}><strong>3. Индекс конкурентной агрессии:</strong> Распределение долей рекомендаций между вами и конкурентами.</div>
        </div>
      </section>

      <section style={{...styles.phaseBlock, backgroundColor: '#000000', color: '#ffffff'}}>
        <div style={styles.markerDark}>[ Phase 02 / Engineering ]</div>
        <h2 style={styles.h2Dark}>Построение графов доверия и продуктовых связей</h2>
        <p style={styles.textDark}>Языковые модели мыслят не страницами, а сущностями и связями между ними (Knowledge Graphs).</p>
        <div style={styles.list}>
          <div style={styles.listItemDark}><strong>1. Семантическая паспортизация:</strong> Создание жестких цифровых связей между брендом, экспертами, лицензиями и кейсами.</div>
          <div style={styles.listItemDark}><strong>2. Устранение семантического шума:</strong> Очистка цифрового контура от устаревших и противоречивых данных.</div>
          <div style={styles.listItemDark}><strong>3. Машиночитаемая интеграция:</strong> Упаковка данных в форматы, оптимизированные для RAG-извлечения.</div>
        </div>
      </section>

      <section style={styles.phaseBlock}>
        <div style={styles.marker}>[ Phase 03 / Sync & Monitor ]</div>
        <h2 style={styles.h2}>Непрерывный контроль индексации и RAG-циклов</h2>
        <p style={styles.text}>Алгоритмы обучения языковых моделей постоянно обновляются. То, что работало вчера, требует корректировки сегодня.</p>
        <div style={styles.list}>
          <div style={styles.listItem}><strong>1. Краулинг-аудит:</strong> Мониторинг того, как боты (GPTBot, ClaudeBot, PerplexityBot) сканируют инфраструктуру клиента.</div>
          <div style={styles.listItem}><strong>2. Динамический векторный трекинг:</strong> Еженедельный замер изменения индекса видимости бренда.</div>
          <div style={styles.listItem}><strong>3. Реактивное обновление:</strong> Быстрое внесение изменений при выходе новых версий foundational models.</div>
        </div>
      </section>

      <section style={{...styles.section, backgroundColor: '#000000', color: '#ffffff'}}>
        <h2 style={styles.h2Dark}>Прогнозируемый результат вместо маркетинговой неопределенности</h2>
        <p style={styles.textDark}>Наша методология превращает попадание в рекомендации ИИ из случайной удачи в управляемый инженерный процесс. Вы получаете прозрачную аналитику, измеримый рост индекса видимости и поток целевых лидов.</p>
        <Link to="/audit" style={styles.buttonBlue}>ЗАПРОСИТЬ ПРЕЗЕНТАЦИЮ МЕТОДОЛОГИИ</Link>
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
  phaseBlock: { maxWidth: '1100px', margin: '0 auto', padding: '80px 40px', borderTop: '2px solid #000000' },
  tag: { display: 'inline-block', backgroundColor: '#000000', color: '#00a8e8', padding: '8px 16px', fontSize: '12px', fontWeight: '700', marginBottom: '32px', letterSpacing: '2px' },
  marker: { fontSize: '12px', fontWeight: '800', color: '#00a8e8', letterSpacing: '2px', marginBottom: '16px' },
  markerDark: { fontSize: '12px', fontWeight: '800', color: '#00a8e8', letterSpacing: '2px', marginBottom: '16px' },
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px', color: '#000000', textTransform: 'uppercase' },
  h2: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '24px', color: '#000000', textTransform: 'uppercase' },
  h2Dark: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '24px', color: '#ffffff', textTransform: 'uppercase' },
  subtitle: { fontSize: '18px', color: '#333333', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' },
  text: { fontSize: '16px', color: '#000000', lineHeight: '1.7', maxWidth: '900px', marginBottom: '24px' },
  textDark: { fontSize: '16px', color: '#cccccc', lineHeight: '1.7', maxWidth: '900px', marginBottom: '24px' },
  list: { textAlign: 'left', maxWidth: '900px', margin: '32px auto 0' },
  listItem: { fontSize: '15px', color: '#000000', lineHeight: '1.7', marginBottom: '20px', padding: '20px', border: '2px solid #000000', backgroundColor: '#ffffff' },
  listItemDark: { fontSize: '15px', color: '#ffffff', lineHeight: '1.7', marginBottom: '20px', padding: '20px', border: '2px solid #00a8e8', backgroundColor: '#111111' },
  buttonBlue: { display: 'inline-block', backgroundColor: '#00a8e8', color: '#000000', fontWeight: '800', padding: '20px 40px', textDecoration: 'none', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '32px' },
  footer: { textAlign: 'center', padding: '40px 20px', color: '#666666', fontSize: '13px', borderTop: '2px solid #000000', marginTop: '80px', fontWeight: '600' }
}
