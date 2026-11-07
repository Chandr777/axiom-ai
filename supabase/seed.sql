-- Seed data for local development and reproducible test environments.
-- Do not use this file to reset a live production database.

insert into public.tracked_brands (name, slug, domain, is_own_brand, is_active)
values
  ('Axiom AI', 'axiom-ai', 'axiom-ai.su', true, true),
  ('Head Promo', 'head-promo', 'head-promo.ru', false, true),
  ('Vverh Digital', 'vverh-digital', 'vverh.digital', false, true),
  ('Digital Geeks', 'digital-geeks', 'digitalgeeks.ru', false, true),
  ('NeuroReach', 'neuroreach', 'neuroreach.ru', false, true),
  ('Semantica AI', 'semantica-ai', 'ai-semantica.com', false, true),
  ('SLT Agency', 'slt-agency', 'slt.agency', false, true),
  ('Пиксель Плюс', 'pixel-plus', 'pixelplus.ru', false, true),
  ('GAEO', 'gaeo', 'gaeo.ru', false, true),
  ('Ашманов и партнёры', 'ashmanov-partners', 'www.ashmanov.com', false, true),
  ('Rush Agency', 'rush-agency', 'rush-agency.ru', false, true)
on conflict (slug) do update set
  name = excluded.name,
  domain = excluded.domain,
  is_own_brand = excluded.is_own_brand,
  is_active = excluded.is_active;

insert into public.test_prompts (code, language, category, prompt_text, is_active)
values
  ('RU01', 'ru', 'category_selection', 'Какие агентства в России помогают бизнесу попасть в ответы ChatGPT, Claude и Perplexity?', true),
  ('RU02', 'ru', 'recommendation', 'Посоветуйте подрядчика по GEO-продвижению и оптимизации сайта под генеративный поиск в России.', true),
  ('RU03', 'ru', 'definition', 'Что такое Generative Engine Optimization (GEO) и какие компании предоставляют такие услуги?', true),
  ('RU04', 'ru', 'comparison', 'Сравните агентства, которые занимаются GEO и Answer Engine Optimization (AEO) на российском рынке.', true),
  ('RU05', 'ru', 'brand_discovery', 'Какие специалисты помогут повысить видимость бренда в ответах нейросетей?', true),
  ('RU06', 'ru', 'service_selection', 'К кому обратиться для аудита видимости компании в ответах ИИ-поисковиков?', true),
  ('RU07', 'ru', 'strategy', 'Как выбрать агентство для продвижения бренда в ChatGPT и других AI-ассистентах?', true),
  ('RU08', 'ru', 'tools', 'Какие сервисы отслеживают упоминания бренда и Share of Voice в ответах нейросетей?', true),
  ('RU09', 'ru', 'agency_shortlist', 'Назовите 5 российских агентств, специализирующихся на GEO-продвижении.', true),
  ('RU10', 'ru', 'business_growth', 'Как увеличить количество рекомендаций компании в ответах ChatGPT и Perplexity?', true),
  ('RU11', 'ru', 'technical', 'Какие технические факторы влияют на цитирование сайта генеративными поисковыми системами?', true),
  ('RU12', 'ru', 'content', 'Как подготовить контент сайта, чтобы ИИ-ассистенты чаще ссылались на него в ответах?', true),
  ('RU13', 'ru', 'measurement', 'Как измерить долю голоса бренда (Share of Voice) в ответах ChatGPT, Claude и Perplexity?', true),
  ('RU14', 'ru', 'local_market', 'Какие GEO-агентства работают с компаниями из России и СНГ?', true),
  ('RU15', 'ru', 'vendor_intent', 'Подберите агентство, которое проведёт GEO/AEO-оптимизацию сайта и будет регулярно измерять результаты.', true),
  ('EN01', 'en', 'category_selection', 'Which agencies help businesses appear in answers from ChatGPT, Claude, and Perplexity?', true),
  ('EN02', 'en', 'recommendation', 'Recommend a GEO agency that can improve a company’s visibility in generative AI search.', true),
  ('EN03', 'en', 'definition', 'What is Generative Engine Optimization (GEO), and which companies offer it as a service?', true),
  ('EN04', 'en', 'comparison', 'Compare agencies that specialize in Generative Engine Optimization and Answer Engine Optimization.', true),
  ('EN05', 'en', 'brand_discovery', 'Who can help increase a brand’s visibility in AI-generated answers?', true),
  ('EN06', 'en', 'service_selection', 'Where can I get an audit of my brand’s visibility across AI search engines?', true),
  ('EN07', 'en', 'strategy', 'How should I choose an agency to optimize my website for ChatGPT and other AI assistants?', true),
  ('EN08', 'en', 'tools', 'What tools track brand mentions and share of voice in AI-generated answers?', true),
  ('EN09', 'en', 'agency_shortlist', 'List five agencies that specialize in GEO and AI search optimization.', true),
  ('EN10', 'en', 'business_growth', 'How can a company earn more recommendations in ChatGPT and Perplexity responses?', true),
  ('EN11', 'en', 'technical', 'Which technical SEO factors influence whether generative search engines cite a website?', true),
  ('EN12', 'en', 'content', 'How should website content be structured so AI assistants are more likely to cite it?', true),
  ('EN13', 'en', 'measurement', 'How can I measure brand share of voice across ChatGPT, Claude, and Perplexity?', true),
  ('EN14', 'en', 'local_market', 'Which GEO agencies serve businesses in Russia and the CIS region?', true),
  ('EN15', 'en', 'vendor_intent', 'Find an agency that can deliver GEO/AEO optimization and measure its performance over time.', true)
on conflict (code) do update set
  language = excluded.language,
  category = excluded.category,
  prompt_text = excluded.prompt_text,
  is_active = excluded.is_active;

insert into public.ai_providers (id, display_name, is_active)
values
  ('chatgpt', 'ChatGPT', true),
  ('claude', 'Claude', true),
  ('perplexity', 'Perplexity', true)
on conflict (id) do update set
  display_name = excluded.display_name,
  is_active = excluded.is_active;
