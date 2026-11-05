import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const listItemStyle = {
  fontSize: '14px',
  color: '#000000',
  lineHeight: '1.6',
  marginBottom: '12px',
  paddingLeft: '20px',
  position: 'relative',
  textAlign: 'justify'
}

export default function Pricing() {
  return (
    <div style={styles.container}>
      <Navbar />

      <section style={styles.section}>
        <div style={styles.tag}>[ Pricing & Engagement Models ]</div>
        <h1 style={styles.h1}>ТАРИФНЫЕ ПЛАНЫ</h1>
        <p style={styles.subtitle}>Выберите уровень инженерного вмешательства в архитектуру генеративного поиска.</p>
      </section>

      <section style={styles.gridSection}>
        {/* FREE */}
        <div style={{...styles.card, textAlign: 'center'}}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>FREE</h2>
            <p style={styles.cardSubtitle}>AI-FOOTPRINT EXPRESS</p>
          </div>
          <div style={styles.priceBlock}>
            <span style={styles.price}>0 ₽</span>
            <span style={styles.priceNote}>Разовый отчёт</span>
          </div>
          <p style={{...styles.cardDesc, textAlign: 'center'}}>Для ЛПР, которые хотят самостоятельно оценить текущее положение бренда перед принятием решения.</p>
          <ul style={styles.features}>
            <li style={listItemStyle}>Автоматический срез видимости в топ-3 LLM</li>
            <li style={listItemStyle}>Отчёт по 15 ключевым коммерческим запросам</li>
            <li style={listItemStyle}>Индекс цитирования бренда</li>
            <li style={listItemStyle}>Выявление критических «галлюцинаций» ИИ</li>
            <li style={listItemStyle}>Сравнительная таблица с 3 конкурентами</li>
            <li style={listItemStyle}>PDF-отчёт на email в течение 24 часов</li>
          </ul>
        </div>

        {/* PRO */}
        <div style={{...styles.card, ...styles.cardPro, textAlign: 'center'}}>
          <div style={styles.badge}>ВЫБОР ЛИДЕРОВ</div>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>PRO</h2>
            <p style={styles.cardSubtitle}>СТРАТЕГИЧЕСКИЙ БРИФ</p>
          </div>
          <div style={styles.priceBlock}>
            <span style={styles.price}>43 000 – 87 000 ₽</span>
            <span style={styles.priceNote}>Разовая оплата за проект</span>
          </div>
          <p style={{...styles.cardDesc, textAlign: 'center'}}>Для компаний, готовых к системной работе по встраиванию бренда в архитектуру LLM.</p>
          <ul style={styles.features}>
            <li style={listItemStyle}>Всё из тарифа FREE, плюс:</li>
            <li style={listItemStyle}>Диагностика по 100+ запросам (полная матрица)</li>
            <li style={listItemStyle}>Разработка ТЗ инженерами Axiom AI</li>
            <li style={listItemStyle}>Vector & Entity Injection (паспортизация)</li>
            <li style={listItemStyle}>LLM Crawling Architecture (JSON-LD, API)</li>
            <li style={listItemStyle}>Multi-Source Citation (посев на 10+ площадках)</li>
            <li style={listItemStyle}>Персональный инженер-куратор</li>
            <li style={listItemStyle}>Дорожная карта на 6 месяцев</li>
            <li style={listItemStyle}>2 контрольных замера (30 и 90 дней)</li>
          </ul>
        </div>

        {/* BUSINESS */}
        <div style={{...styles.card, textAlign: 'center'}}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>BUSINESS</h2>
            <p style={styles.cardSubtitle}>НЕПРЕРЫВНОЕ ДОМИНИРОВАНИЕ</p>
          </div>
          <div style={styles.priceBlock}>
            <span style={styles.price}>140 000 – 160 000 ₽</span>
            <span style={styles.priceNote}>В месяц / контракт от 6 мес.</span>
          </div>
          <p style={{...styles.cardDesc, textAlign: 'center'}}>Для Enterprise-клиентов, для которых позиция в рекомендациях ИИ — вопрос рыночной монополии.</p>
          <ul style={styles.features}>
            <li style={listItemStyle}>Всё из тарифа PRO, плюс:</li>
            <li style={listItemStyle}>Еженедельный мониторинг в топ-5 LLM</li>
            <li style={listItemStyle}>Динамический векторный трекинг</li>
            <li style={listItemStyle}>Реактивное обновление при апдейтах моделей</li>
            <li style={listItemStyle}>Непрерывный посев контента (4+ в месяц)</li>
            <li style={listItemStyle}>Управление консенсусом данных в сети</li>
            <li style={listItemStyle}>Краулинг-аудит инфраструктуры</li>
            <li style={listItemStyle}>Выделенная команда (инженер + аналитик)</li>
            <li style={listItemStyle}>Ежемесячный стратегический отчёт</li>
            <li style={listItemStyle}>Гарантия сохранения индекса видимости</li>
          </ul>
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
  gridSection: { maxWidth: '1200px', margin: '0 auto', padding: '0 40px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'stretch' },
  tag: { display: 'inline-block', backgroundColor: '#000000', color: '#00a8e8', padding: '8px 16px', fontSize: '12px', fontWeight: '700', marginBottom: '32px', letterSpacing: '2px' },
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px', color: '#000000', textTransform: 'uppercase', textAlign: 'center' },
  subtitle: { fontSize: '18px', color: '#333333', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', textAlign: 'center' },
  
  card: { border: '2px solid #000000', padding: '40px 32px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', position: 'relative' },
  cardPro: { border: '2px solid #00a8e8', boxShadow: '0 10px 30px rgba(0, 168, 232, 0.15)' },
  
  badge: { position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#00a8e8', color: '#000000', fontSize: '11px', fontWeight: '800', padding: '6px 16px', letterSpacing: '1px' },
  
  cardHeader: { textAlign: 'center', marginBottom: '24px' },
  cardTitle: { fontSize: '28px', fontWeight: '900', color: '#000000', margin: 0, letterSpacing: '2px' },
  cardSubtitle: { fontSize: '12px', fontWeight: '700', color: '#00a8e8', margin: '8px 0 0', letterSpacing: '1px' },
  
  priceBlock: { textAlign: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid #e5e5e5' },
  price: { display: 'block', fontSize: '24px', fontWeight: '900', color: '#000000', whiteSpace: 'nowrap' },
  priceNote: { fontSize: '13px', color: '#666666', marginTop: '4px', display: 'block' },
  
  cardDesc: { fontSize: '15px', color: '#333333', lineHeight: '1.6', marginBottom: '24px', textAlign: 'center' },
  
  features: { listStyle: 'none', padding: 0, margin: '0 0 32px 0', flexGrow: 1 },
  
  footer: { textAlign: 'center', padding: '40px 20px', color: '#666666', fontSize: '13px', borderTop: '2px solid #000000', fontWeight: '600' }
}
