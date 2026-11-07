-- Axiom AI — initial AI Share of Voice schema.
-- All public tables are private to server-side service_role access.
-- No anon/authenticated policies or table grants are intentionally created.

create table if not exists public.tracked_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  domain text,
  is_own_brand boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint tracked_brands_own_brand_slug
    check (not is_own_brand or slug = 'axiom-ai')
);

create table if not exists public.test_prompts (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  language text not null check (language in ('ru', 'en')),
  category text not null,
  prompt_text text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_providers (
  id text primary key,
  display_name text not null,
  is_active boolean not null default true
);

create table if not exists public.measurement_runs (
  id uuid primary key default gen_random_uuid(),
  panel_mode text not null default 'both'
    check (panel_mode in ('brand', 'market', 'both')),
  market_scope text not null default 'both'
    check (market_scope in ('ru', 'en', 'both')),
  status text not null default 'pending'
    check (status in ('pending', 'running', 'completed', 'failed', 'cancelled')),
  started_at timestamptz,
  completed_at timestamptz,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_responses (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.measurement_runs(id) on delete cascade,
  prompt_id uuid not null references public.test_prompts(id),
  provider_id text not null references public.ai_providers(id),
  model_name text,
  response_text text,
  response_status text not null default 'pending'
    check (response_status in ('pending', 'success', 'error')),
  error_message text,
  latency_ms integer check (latency_ms is null or latency_ms >= 0),
  created_at timestamptz not null default now(),
  constraint ai_responses_run_id_prompt_id_provider_id_key
    unique (run_id, prompt_id, provider_id)
);

create table if not exists public.response_citations (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references public.ai_responses(id) on delete cascade,
  brand_id uuid references public.tracked_brands(id) on delete set null,
  url text not null,
  title text,
  domain text,
  citation_position integer check (citation_position is null or citation_position > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.response_brand_metrics (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references public.ai_responses(id) on delete cascade,
  brand_id uuid not null references public.tracked_brands(id) on delete cascade,
  mention_count integer not null default 0 check (mention_count >= 0),
  recommendation_count integer not null default 0 check (recommendation_count >= 0),
  citation_count integer not null default 0 check (citation_count >= 0),
  first_mention_position integer check (first_mention_position is null or first_mention_position > 0),
  sentiment text check (sentiment in ('positive', 'neutral', 'negative', 'mixed')),
  evidence jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  constraint response_brand_metrics_response_id_brand_id_key
    unique (response_id, brand_id)
);

alter table public.tracked_brands enable row level security;
alter table public.test_prompts enable row level security;
alter table public.ai_providers enable row level security;
alter table public.measurement_runs enable row level security;
alter table public.ai_responses enable row level security;
alter table public.response_citations enable row level security;
alter table public.response_brand_metrics enable row level security;

revoke all on table
  public.tracked_brands,
  public.test_prompts,
  public.ai_providers,
  public.measurement_runs,
  public.ai_responses,
  public.response_citations,
  public.response_brand_metrics
from anon, authenticated;

grant all on table
  public.tracked_brands,
  public.test_prompts,
  public.ai_providers,
  public.measurement_runs,
  public.ai_responses,
  public.response_citations,
  public.response_brand_metrics
to service_role;
