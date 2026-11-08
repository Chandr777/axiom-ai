import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './monitoring.css';

const providerNames = {
  chatgpt: 'ChatGPT API',
  claude: 'Claude API',
  perplexity: 'Perplexity API',
};
const pct = (value) => value == null ? '—' : `${value.toFixed(1)}%`;
const when = (value) => value ? new Date(value).toLocaleString() : '—';

function Metric({ label, value, note }) {
  return <article className="sov-metric">
    <span>{label}</span>
    <strong>{value}</strong>
    <small>{note}</small>
  </article>;
}

export default function Monitoring() {
  const [key, setKey] = useState(() => sessionStorage.getItem('axiom-sov-key') || '');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [market, setMarket] = useState('both');
  const [provider, setProvider] = useState('all');
  const [locale, setLocale] = useState('all');
  const [selectedRunId, setSelectedRunId] = useState('');
  const [expanded, setExpanded] = useState(null);

  async function api(path, options = {}) {
    const accessKey = key.trim();
    if (!accessKey) throw new Error('Введите ключ доступа.');
    if (!/^[!-~]+$/.test(accessKey)) {
      throw new Error('В ключе обнаружены недопустимые символы. Скопируйте значение MONITORING_ACCESS_KEY из Vercel заново; не вводите его вручную.');
    }

    const response = await fetch(path, {
      ...options,
      headers: {
        ...options.headers,
        'content-type': 'application/json',
        'x-monitoring-key': accessKey,
      },
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);
    return result;
  }

  async function load(runId = selectedRunId) {
    if (!key) return;
    setLoading(true);
    setError('');
    try {
      const query = runId ? `?runId=${encodeURIComponent(runId)}` : '';
      const result = await api(`/api/monitoring${query}`);
      sessionStorage.setItem('axiom-sov-key', key);
      setData(result);
      setSelectedRunId(result.selectedRun?.id || '');
      setExpanded(null);
    } catch (loadError) {
      setError(loadError.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (key) load('');
  }, []);

  async function run() {
    setRunning(true);
    setError('');
    try {
      const result = await api('/api/monitoring/run', {
        method: 'POST',
        body: JSON.stringify({ market }),
      });
      await load(result.runId);
    } catch (runError) {
      setError(runError.message);
    } finally {
      setRunning(false);
    }
  }

  const rows = useMemo(() => (data?.results || []).filter((row) => (
    (provider === 'all' || row.provider === provider)
    && (locale === 'all' || row.locale === locale)
  )), [data, provider, locale]);

  const totalMentions = data?.metrics?.brands?.reduce((sum, brand) => sum + brand.mentionCount, 0) || 0;
  const maxMentions = Math.max(1, ...(data?.metrics?.brands || []).map((brand) => brand.mentionCount));

  return <div className="sov-shell">
    <header className="sov-header">
      <Link to="/" className="sov-brand">AXIOM <span>AI</span></Link>
      <div><span className="sov-private">INTERNAL ANALYTICS</span><Link to="/" className="sov-back">На сайт ↗</Link></div>
    </header>

    <main className="sov-main">
      <div className="sov-title">
        <div>
          <p className="sov-eyebrow">AI SEARCH VISIBILITY / MONITORING</p>
          <h1>AI Share of Voice</h1>
          <p>Видимость Axiom AI и конкурентов в ответах генеративных систем</p>
        </div>
        <small>{data?.selectedRun ? `Выбран запуск: ${when(data.selectedRun.created_at)}` : 'Ожидает первого замера'}</small>
      </div>

      {!data && <section className="sov-login">
        <h2>Внутренняя панель</h2>
        <p>Введите MONITORING_ACCESS_KEY из настроек Vercel.</p>
        <form onSubmit={(event) => { event.preventDefault(); load(''); }}>
          <input type="password" value={key} onChange={(event) => setKey(event.target.value)} placeholder="Ключ доступа" autoComplete="current-password" autoCapitalize="off" spellCheck={false} />
          <button disabled={!key || loading}>{loading ? 'Проверка…' : 'Открыть панель'}</button>
        </form>
        {error && <p className="sov-error">{error}</p>}
      </section>}

      {data && <>
        <section className="sov-toolbar">
          <label>История запусков
            <select value={selectedRunId} onChange={(event) => load(event.target.value)} disabled={loading || !data.runs.length}>
              {!data.runs.length && <option value="">Нет запусков</option>}
              {data.runs.map((item) => <option key={item.id} value={item.id}>
                {when(item.created_at)} · {item.market.toUpperCase()} · {item.status}
              </option>)}
            </select>
          </label>
          <label>Новый замер
            <select value={market} onChange={(event) => setMarket(event.target.value)}>
              <option value="both">RU + EN · 30 запросов</option>
              <option value="ru">RU · 15 запросов</option>
              <option value="en">EN · 15 запросов</option>
            </select>
          </label>
          <button onClick={run} disabled={running || loading}>{running ? 'Выполняется…' : 'Запустить замер'}</button>
          <button className="sov-light" onClick={() => load()} disabled={loading}>{loading ? 'Обновление…' : 'Обновить'}</button>
          <button className="sov-light" onClick={() => {
            sessionStorage.removeItem('axiom-sov-key');
            setKey('');
            setData(null);
            setSelectedRunId('');
          }}>Выйти</button>
        </section>

        {error && <p className="sov-error">{error}</p>}
        <p className="sov-disclaimer">
          API-ответы не являются точной копией пользовательских интерфейсов ChatGPT, Claude или Perplexity.
          Ошибочные запросы исключены из знаменателей; значения до первого запуска не подменяются демо-данными.
        </p>

        {!data.selectedRun && <section className="sov-empty">
          <span className="sov-empty-mark">01</span>
          <h2>Первый замер ещё не выполнен</h2>
          <p>База подготовлена: 11 брендов, 30 запросов на русском и английском языках и 3 AI-провайдера. После настройки ключей и согласования расходов здесь появятся реальные результаты.</p>
        </section>}

        {data.selectedRun && <>
          <div className="sov-run-meta">
            <span>Статус: <b>{data.selectedRun.status}</b></span>
            <span>Успешных ответов: <b>{data.metrics.successCount}</b></span>
            <span>Ошибок: <b>{data.metrics.failedCount}</b></span>
            <span>Рынок: <b>{data.selectedRun.market.toUpperCase()}</b></span>
          </div>

          {data.selectedRun.config?.cost_summary && <section className="sov-panel sov-cost-panel">
            <h2>Расходы на API</h2>
            <div className="sov-cost-grid">
              <article><span>Фактическая стоимость</span><strong>{data.selectedRun.config.cost_summary.cost_unknown ? 'Неполная оценка' : '$' + Number(data.selectedRun.config.cost_summary.total_cost_usd || 0).toFixed(4)}</strong></article>
              <article><span>Бюджет запуска</span><strong>{'$' + Number(data.selectedRun.config.cost_summary.budget_usd || 5).toFixed(2)}</strong></article>
              <article><span>Выполнено запросов</span><strong>{data.selectedRun.config.cost_summary.completed_request_count} / {data.selectedRun.config.cost_summary.planned_request_count}</strong></article>
            </div>
            <p>По провайдерам: {Object.entries(data.selectedRun.config.cost_summary.cost_by_provider || {}).map(([id, value]) => (providerNames[id] || id) + ': $' + Number(value).toFixed(4)).join(' · ') || 'Нет подтверждённых расходов'}</p>
            {data.selectedRun.config.partial && <p className="sov-cost-warning">Замер остановлен досрочно: {data.selectedRun.config.cost_summary.budget_reached ? 'достигнут бюджетный ориентир.' : 'стоимость одного из провайдеров нельзя подтвердить.'} Выполнена только часть запланированных запросов.</p>}
          </section>
          <section className="sov-metrics">
            <Metric label="Share of Voice" value={pct(data.metrics.shareOfVoice)} note="Доля упоминаний Axiom AI среди брендов" />
            <Metric label="Mention Rate" value={pct(data.metrics.mentionRate)} note="Успешные ответы с упоминанием Axiom AI" />
            <Metric label="Recommendation Rate" value={pct(data.metrics.recommendationRate)} note="Эвристически определённые рекомендации" />
            <Metric label="Citation Rate" value={pct(data.metrics.citationRate)} note="Успешные ответы с источником axiom-ai.su" />
          </section>

          <section className="sov-panel">
            <h2>Видимость по AI-платформам</h2>
            <div className="sov-platforms">
              {data.byProvider.map((item) => <article key={item.provider}>
                <b>{providerNames[item.provider]}</b>
                <strong>{pct(item.mentionRate)}</strong>
                <small>Mention Rate Axiom AI · {item.successCount} успешных · {item.failedCount} ошибок</small>
              </article>)}
            </div>
          </section>

          <section className="sov-panel">
            <div className="sov-panel-heading">
              <div><h2>Сравнение брендов</h2><p>Доля считается от суммы упоминаний всех отслеживаемых брендов в выбранном запуске.</p></div>
              <span>{totalMentions} упоминаний</span>
            </div>
            <div className="sov-brand-bars">
              {data.metrics.brands.map((brand) => {
                const share = totalMentions ? (brand.mentionCount / totalMentions) * 100 : 0;
                return <div className={brand.id === 'axiom-ai' ? 'sov-brand-bar sov-own' : 'sov-brand-bar'} key={brand.id}>
                  <div className="sov-brand-bar-label"><b>{brand.name}</b><span>{brand.mentionCount} · {pct(share)}</span></div>
                  <div className="sov-bar-track"><span style={{ width: `${(brand.mentionCount / maxMentions) * 100}%` }} /></div>
                </div>;
              })}
            </div>
            <div className="sov-scroll">
              <table>
                <thead><tr><th>Бренд</th><th>Упоминания</th><th>Ср. позиция</th><th>Mention</th><th>Recommendation</th><th>Citation</th><th>SoV</th></tr></thead>
                <tbody>{data.metrics.brands.map((brand) => {
                  const share = totalMentions ? (brand.mentionCount / totalMentions) * 100 : null;
                  return <tr key={brand.id} className={brand.id === 'axiom-ai' ? 'sov-own' : ''}>
                    <td>{brand.name}{brand.id === 'axiom-ai' ? ' · ваш бренд' : ''}</td>
                    <td>{brand.mentionCount}</td>
                    <td>{brand.avgPosition == null ? '—' : brand.avgPosition.toFixed(1)}</td>
                    <td>{pct(brand.mentionRate)}</td>
                    <td>{pct(brand.recommendationRate)}</td>
                    <td>{pct(brand.citationRate)}</td>
                    <td>{pct(share)}</td>
                  </tr>;
                })}</tbody>
              </table>
            </div>
          </section>

          <section className="sov-panel">
            <h2>Сравнение рынков</h2>
            <div className="sov-platforms sov-locale-grid">
              {data.byLocale.map((item) => <article key={item.locale}>
                <b>{item.locale.toUpperCase()}</b>
                <strong>{pct(item.mentionRate)}</strong>
                <small>Mention Rate Axiom AI · {item.successCount} успешных · {item.failedCount} ошибок</small>
              </article>)}
            </div>
          </section>

          <section className="sov-panel">
            <div className="sov-panel-heading">
              <div><h2>Ответы AI-моделей</h2><p>Выберите платформу и язык, чтобы просмотреть исходные ответы и ссылки.</p></div>
              <div className="sov-filters">
                <label>Платформа
                  <select value={provider} onChange={(event) => setProvider(event.target.value)}>
                    <option value="all">Все платформы</option>
                    {Object.entries(providerNames).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
                  </select>
                </label>
                <label>Язык
                  <select value={locale} onChange={(event) => setLocale(event.target.value)}>
                    <option value="all">RU + EN</option><option value="ru">Русский</option><option value="en">English</option>
                  </select>
                </label>
              </div>
            </div>
            <p className="sov-result-count">Показано ответов: {rows.length}</p>
            {rows.length === 0 && <p className="sov-no-results">По выбранным фильтрам ответов нет.</p>}
            {rows.map((row, index) => <article className="sov-answer" key={row.id || `${row.prompt_id}-${index}`}>
              <button onClick={() => setExpanded(expanded === row.id ? null : row.id)}>
                <span>{row.prompt_id} · {providerNames[row.provider]} · {row.locale.toUpperCase()}</span>
                <small>{row.status === 'success'
                  ? (row.brands || []).filter((brand) => brand.mentioned).map((brand) => brand.name).join(', ') || 'Нет упоминаний'
                  : 'Ошибка'}</small>
              </button>
              {expanded === row.id && <div>
                <p><b>Запрос:</b> {row.prompt}</p>
                {row.status === 'error' ? <p className="sov-error">{row.error}</p> : <>
                  <p className="sov-answer-text">{row.answer}</p>
                  <p><b>Источники:</b> {(row.citations || []).length
                    ? row.citations.map((citation, citationIndex) => <a key={citationIndex} href={citation.url} target="_blank" rel="noreferrer">{citation.title || citation.url}</a>)
                    : 'Не возвращены'}</p>
                  <small>{row.model || 'Модель не указана'} · {row.latency_ms ?? '—'} мс</small>
                </>}
              </div>}
            </article>)}
          </section>
        </>}

        <section className="sov-panel">
          <h2>История измерений</h2>
          {!data.runs.length && <p className="sov-no-results">Запусков пока нет.</p>}
          <div className="sov-scroll"><table>
            <thead><tr><th>Дата</th><th>Рынок</th><th>Статус</th><th>Успешно</th><th>Ошибки</th><th>Время</th><th /></tr></thead>
            <tbody>{data.runs.map((item) => <tr key={item.id}>
              <td>{when(item.created_at)}</td><td>{item.market.toUpperCase()}</td><td>{item.status}</td>
              <td>{item.successful_count}</td><td>{item.failed_count}</td>
              <td>{item.duration_ms ? `${Math.round(item.duration_ms / 1000)} сек.` : '—'}</td>
              <td><button className="sov-table-action" onClick={() => load(item.id)} disabled={loading || item.id === selectedRunId}>Открыть</button></td>
            </tr>)}</tbody>
          </table></div>
        </section>
      </>}
    </main>
    <footer className="sov-footer">AXIOM AI · AI SHARE OF VOICE · INTERNAL ANALYTICS</footer>
  </div>;
}
