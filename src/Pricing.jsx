import { Link } from 'react-router-dom'
import Navbar from './Navbar'

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
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>FREE</h2>
            <p style={styles.cardSubtitle}>AI-FOOTPRINT EXPRESS</p>
          </div>
          <div style={styles.priceBlock}>
            <span style={styles.price}>0 ₽</span>
            <span style={styles.priceNote}>Разовый отчёт</span>
          </div>
          <p style={styles.cardDesc}>Для ЛПР, которые хотят самостоятельно оценить текущее положение бренда перед принятием решения.</p>
          <ul style={styles.features}>
            <li>Автоматический срез видимости в топ-3 LLM</li>
            <li>Отчёт по 15 ключевым коммерческим запросам</li>
            <li>Индекс цитирования бренда</li>
            <li>Выявление критических «галлюцинаций» ИИ</li>
            <li>Сравнительная таблица с 3 конкурентами</li>
            <li>PDF-отчёт на email в течение 24 часов</li>
          </ul>
          <Link to="/audit" style={styles.buttonOutline}>ПОЛУЧИТЬ ОТЧЁТ</Link>
        </div>

        {/* PRO */}
        <div style={{...styles.card, ...styles.cardPro}}>
          <div style={styles.badge}>ВЫБОР ЛИДЕРОВ</div>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>PRO</h2>
            <p style={styles.cardSubtitle}>СТРАТЕГИЧЕСКИЙ БРИФ</p>
          </div>
          <div style={styles.priceBlock}>
            <span style={styles.price}>43 000 – 87 000 ₽</span>
            <span style={styles.priceNote}>Разовая оплата за проект</span>
          </div>
          <p style={styles.cardDesc}>Для компаний, готовых к системной работе по встраиванию бренда в архитектуру LLM.</p>
          <ul style={styles.features}>
            <li>Всё из тарифа FREE, плюс:</li>
            <li>Диагностика по 100+ запросам (полная матрица)</li>
            <li>Разработка ТЗ инженерами Axiom AI</li>
            <li>Vector & Entity Injection (паспортизация)</li>
            <li>LLM Crawling Architecture (JSON-LD, API)</li>
            <li>Multi-Source Citation (посев на 10+ площадках)</li>
            <li>Персональный инженер-куратор</li>
            <li>Дорожная карта на 6 месяцев</li>
            <li>2 контрольных замера (30 и 90 дней)</li>
          </ul>
          <Link to="/audit" style={styles.buttonSolid}>ЗАПРОСИТЬ БРИФ</Link>
        </div>

        {/* BUSINESS */}
        <div style={{...styles.card, ...styles.cardBusiness}}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitleDark}>BUSINESS</h2>
            <p style={styles.cardSubtitleDark}>НЕПРЕРЫВНОЕ ДОМИНИРОВАНИЕ</p>
          </div>
          <div style={styles.priceBlock}>
            <span style={styles.priceDark}>140 000 – 160 000 ₽</span>
            <span style={styles.priceNoteDark}>В месяц / контракт от 6 мес.</span>
          </div>
          <p style={styles.cardDescDark}>Для Enterprise-клиентов, для которых позиция в рекомендациях ИИ — вопрос рыночной монополии.</p>
          <ul style={styles.featuresDark}>
            <li>Всё из тарифа PRO, плюс:</li>
            <li>Еженедельный мониторинг в топ-5 LLM</li>
            <li>Динамический векторный трекинг</li>
            <li>Реактивное обновление при апдейтах моделей</li>
            <li>Непрерывный посев контента (4+ в месяц)</li>
            <li>Управление консенсусом данных в сети</li>
            <li>Краулинг-аудит инфраструктуры</li>
            <li>Выделенная команда (инженер + аналитик)</li>
            <li>Ежемесячный стратегический отчёт</li>
            <li>Гарантия сохранения индекса видимости</li>
          </ul>
          <Link to="/audit" style={styles.buttonBlue}>НАЗНАЧИТЬ СЕССИЮ</Link>
        </div>
      </section>

      <section style={styles.bottomCta}>
        <h2 style={styles.h2Dark}>НЕ УВЕРЕНЫ, КАКОЙ ТАРИФ ПОДХОДИТ?</h2>
        <p style={styles.textDark}>Закажите бесплатный AI-Footprint Express. По результатам отчёта наши инженеры покажут, какой уровень вмешательства необходим вашему бренду, и подготовят индивидуальное предложение.</p>
        <Link to="/audit" style={styles.buttonBlue}>НАЧАТЬ С БЕСПЛАТНОГО АУДИТА</Link>
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
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px', color: '#000000', textTransform: 'uppercase' },
  h2Dark: { fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '24px', color: '#ffffff', textTransform: 'uppercase' },
  subtitle: { fontSize: '18px', color: '#333333', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' },
  
  card: { border: '2px solid #000000', padding: '40px 32px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', position: 'relative' },
  cardPro: { border: '2px solid #00a8e8', boxShadow: '0 10px 30px rgba(0, 168, 232, 0.15)' },
  cardBusiness: { backgroundColor: '#000000', color: '#ffffff', border: '2px solid #000000' },
  
  badge: { position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#00a8e8', color: '#000000', fontSize: '11px', fontWeight: '800', padding: '6px 16px', letterSpacing: '1px' },
  
  cardHeader: { textAlign: 'center', marginBottom: '24px' },
  cardTitle: { fontSize: '28px', fontWeight: '900', color: '#000000', margin: 0, letterSpacing: '2px' },
  cardTitleDark: { fontSize: '28px', fontWeight: '900', color: '#ffffff', margin: 0, letterSpacing: '2px' },
  cardSubtitle: { fontSize: '12px', fontWeight: '700', color: '#00a8e8', margin: '8px 0 0', letterSpacing: '1px' },
  cardSubtitleDark: { fontSize: '12px', fontWeight: '700', color: '#00a8e8', margin: '8px 0 0', letterSpacing: '1px' },
  
  priceBlock: { textAlign: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid #e5e5e5' },
  price: { display: 'block', fontSize: '32px', fontWeight: '900', color: '#000000' },
  priceNote: { fontSize: '13px', color: '#666666', marginTop: '4px', display: 'block' },
  priceDark: { display: 'block', fontSize: '32px', fontWeight: '900', color: '#ffffff' },
  priceNoteDark: { fontSize: '13px', color: '#a3a3a3', marginTop: '4px', display: 'block' },
  
  cardDesc: { fontSize: '15px', color: '#333333', lineHeight: '1.6', marginBottom: '24px', textAlign: 'center' },
  cardDescDark: { fontSize: '15px', color: '#cccccc', lineHeight: '1.6', marginBottom: '24px', textAlign: 'center' },
  
  features: { listStyle: 'none', padding: 0, margin: '0 0 32px 0', flexGrow: 1 },
  featuresDark: { listStyle: 'none', padding: 0, margin: '0 0 32px 0', flexGrow: 1 },
  
  buttonOutline: { display: 'block', textAlign: 'center', padding: '16px', border: '2px solid #000000', color: '#000000', textDecoration: 'none', fontWeight: '800', fontSize: '14px', letterSpacing: '1px', marginTop: 'auto' },
  buttonSolid: { display: 'block', textAlign: 'center', padding: '16px', backgroundColor: '#000000', color: '#ffffff', textDecoration: 'none', fontWeight: '800', fontSize: '14px', letterSpacing: '1px', marginTop: 'auto' },
  buttonBlue: { display: 'block', textAlign: 'center', padding: '16px', backgroundColor: '#00a8e8', color: '#000000', textDecoration: 'none', fontWeight: '800', fontSize: '14px', letterSpacing: '1px', marginTop: 'auto' },
  
  bottomCta: { backgroundColor: '#000000', color: '#ffffff', padding: '80px 40px', textAlign: 'center' },
  textDark: { fontSize: '18px', color: '#cccccc', maxWidth: '800px', margin: '0 auto 32px', lineHeight: '1.6' },
  footer: { textAlign: 'center', padding: '40px 20px', color: '#666666', fontSize: '13px', borderTop: '2px solid #000000', fontWeight: '600' }
}

// Добавляем стили для списков через CSS-in-JS хак для псевдоэлементов не нужен, просто используем padding
