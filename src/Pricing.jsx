import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import SiteFooter from './SiteFooter'
import usePageMeta from './usePageMeta'

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
  usePageMeta('Тарифы GEO/AEO — Axiom AI', 'Пакеты услуг Axiom AI по диагностике, технической оптимизации и мониторингу видимости бренда в генеративных системах.', '/pricing')
  return (
    <div style={styles.container}>
      <Navbar />

      <section style={styles.section}>
        <div style={styles.tag}>[ Pricing & Engagement Models ]</div>
        <h1 style={styles.h1}>ТАРИФНЫЕ ПЛАНЫ</h1>
        <p style={styles.subtitle}>Выберите формат диагностики, внедрения и регулярного мониторинга AI-видимости.</p>
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
            <li style={listItemStyle}>Автоматический срез видимости в топ-3 LLM</li>
            <li style={listItemStyle}>Отчёт по 15 ключевым коммерческим запросам</li>
            <li style={listItemStyle}>Индекс цитирования бренда</li>
            <li style={listItemStyle}>Проверка фактических ошибок и неверных сведений в ответах ИИ</li>
            <li style={listItemStyle}>Сравнительная таблица с 3 конкурентами</li>
            <li style={listItemStyle}>PDF-отчёт на email в течение 24 часов</li>
          </ul>
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
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>BUSINESS</h2>
            <p style={styles.cardSubtitle}>НЕПРЕРЫВНОЕ ДОМИНИРОВАНИЕ</p>
          </div>
          <div style={styles.priceBlock}>
            <span style={styles.price}>140 000 – 160 000 ₽</span>
            <span style={styles.priceNote}>В месяц / контракт от 6 мес.</span>
          </div>
          <p style={styles.cardDesc}>Для команд, которым нужны регулярный контроль AI-видимости, техническая поддержка и отчётность.</p>
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
            <li style={listItemStyle}>Регулярный отчёт о динамике метрик без гарантии позиций в ответах моделей</li>
          </ul>
        </div>
      </section>

      <p style={styles.disclaimer}>Показатели и позиции в ответах генеративных систем не гарантируются: результаты зависят от платформы, запроса, региона и доступных источников. Итоговый состав, сроки и стоимость работ согласуются до начала проекта.</p>

      <SiteFooter />
    </div>
  )
}

const styles = {
  container: { fontFamily: 'system-ui, sans-serif', backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh' },
  section: { maxWidth: '1100px', margin: '0 auto', padding: '80px 20px', textAlign: 'center' },
  
  // ИЗМЕНЕНО: Flexbox с центрированием вместо Grid для гарантированного центра на мобильных
  gridSection: { 
    maxWidth: '1200px', 
    margin: '0 auto', 
    padding: '0 20px 80px', 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: '32px', 
    alignItems: 'stretch' 
  },
  
  tag: { display: 'inline-block', backgroundColor: '#000000', color: '#00a8e8', padding: '8px 16px', fontSize: '12px', fontWeight: '700', marginBottom: '32px', letterSpacing: '2px' },
  h1: { fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px', color: '#000000', textTransform: 'uppercase', textAlign: 'center' },
  subtitle: { fontSize: '18px', color: '#333333', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', textAlign: 'center' },
  
  // ИЗМЕНЕНО: Добавлены width и margin для центрирования самой карточки
  card: { 
    border: '2px solid #000000', 
    padding: '40px 24px', 
    display: 'flex', 
    flexDirection: 'column', 
    backgroundColor: '#ffffff', 
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center'
  },
  cardPro: { border: '2px solid #00a8e8', boxShadow: '0 10px 30px rgba(0, 168, 232, 0.15)' },
  
  badge: { position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#00a8e8', color: '#000000', fontSize: '11px', fontWeight: '800', padding: '6px 16px', letterSpacing: '1px', whiteSpace: 'nowrap' },
  
  cardHeader: { textAlign: 'center', marginBottom: '24px' },
  cardTitle: { fontSize: '28px', fontWeight: '900', color: '#000000', margin: 0, letterSpacing: '2px' },
  cardSubtitle: { fontSize: '12px', fontWeight: '700', color: '#00a8e8', margin: '8px 0 0', letterSpacing: '1px' },
  
  priceBlock: { textAlign: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid #e5e5e5' },
  price: { display: 'block', fontSize: '24px', fontWeight: '900', color: '#000000', whiteSpace: 'nowrap' },
  priceNote: { fontSize: '13px', color: '#666666', marginTop: '4px', display: 'block' },
  
  cardDesc: { fontSize: '15px', color: '#333333', lineHeight: '1.6', marginBottom: '24px', textAlign: 'center' },
  
  features: { listStyle: 'none', padding: 0, margin: '0 0 32px 0', flexGrow: 1, textAlign: 'left' }, // Список оставлен выровненным по левому краю для читаемости, но сама карточка по центру
  
  disclaimer: { maxWidth: '900px', margin: '0 auto 50px', padding: '18px 22px', color: '#4b5861', backgroundColor: '#f5f9fb', border: '1px solid #dce3e8', fontSize: '14px', lineHeight: '1.65' },
  footer: { textAlign: 'center', padding: '40px 20px', color: '#666666', fontSize: '13px', borderTop: '2px solid #000000', fontWeight: '600' }
}
