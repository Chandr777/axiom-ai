# Axiom AI — AI Share of Voice

## Решение и объём
Режим both: внутреннее использование сейчас, архитектурный задел для клиентского SaaS. Рынки RU+EN. Всего 30 фиксированных запросов (15 RU + 15 EN), 3 API-платформы и 11 брендов (Axiom AI + 10 конкурентов). Один ответ на запрос и платформу за цикл; следующий запуск создаёт новую точку истории.

## Конкуренты
Head Promo — https://head-promo.ru; Vverh Digital — https://vverh.digital; Digital Geeks — https://digitalgeeks.ru; NeuroReach — https://neuroreach.ru; Semantica AI — https://ai-semantica.com; SLT Agency — https://slt.agency; Пиксель Плюс — https://pixelplus.ru; GAEO — https://gaeo.ru; Ашманов и партнёры — https://www.ashmanov.com; Rush Agency — https://rush-agency.ru.

## Метрики
Mention Rate = успешные ответы с упоминанием бренда / все успешные ответы × 100%. Brand Mention Share (SoV) = число успешных ответов с упоминанием бренда / сумма таких упоминаний для всех 11 брендов × 100% (одно упоминание на бренд в одном ответе). Recommendation Rate = ответы с эвристически определённой рекомендацией / успешные ответы × 100%. Citation Rate = ответы с URL домена бренда в citations / успешные ответы × 100%. Position — порядок первого появления бренда среди отслеживаемых брендов в тексте ответа.

## Функции
Защищённый /monitoring; ручной запуск; история запусков; сводные метрики; разбивки ChatGPT API / Claude API / Perplexity API и RU/EN; сравнение брендов; раскрытие исходных ответов и ссылок; журнал ошибок. Нулевые значения не подменяют отсутствующие данные.

## Архитектура
React/Vite; Vercel Functions; Supabase PostgreSQL; OpenAI Responses API + web_search; Anthropic Messages API + web_search; Perplexity Agent API; еженедельный Vercel Cron. SQL: supabase/ai-sov.sql. Банк промптов и брендов: api/_lib/prompts.js.

## Достоверность и ограничения
API-ответы не являются точной копией consumer UI и не гарантируют одинаковый ответ пользователям. Снимок зависит от модели, поискового инструмента, региона, времени и формулировки. Разметка упоминаний/рекомендаций в MVP эвристическая, требует ручной проверки. Ошибки исключаются из знаменателя.

## Безопасность и критерии
Секреты только в Vercel Environment Variables. Supabase RLS включён без публичных политик, доступ только через service role на сервере. API dashboard/run требуют MONITORING_ACCESS_KEY; cron требует CRON_SECRET. Проверка: без ключа 401; пустая БД — пустое состояние; каждый ответ/ошибка записывается; отказ одного API не блокирует другие; build проходит. Shared-secret не является полноценным multi-tenant auth: до коммерческого запуска добавить SSO/OAuth, tenant_id, роли и изоляцию данных.

## Переменные
MONITORING_ACCESS_KEY, CRON_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY, ANTHROPIC_API_KEY, PERPLEXITY_API_KEY. Опционально OPENAI_MODEL, ANTHROPIC_MODEL, PERPLEXITY_PRESET.

## Расписание
Vercel Cron еженедельно по понедельникам в 04:00 UTC. Для более надёжной обработки длительных задач при масштабировании заменить синхронный запуск на очередь и worker.
