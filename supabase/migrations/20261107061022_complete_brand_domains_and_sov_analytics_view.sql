-- Fill all previously approved tracked brand domains.
update public.tracked_brands
set domain = case slug
  when 'axiom-ai' then 'axiom-ai.su'
  when 'head-promo' then 'head-promo.ru'
  when 'vverh-digital' then 'vverh.digital'
  when 'digital-geeks' then 'digitalgeeks.ru'
  when 'neuroreach' then 'neuroreach.ru'
  when 'semantica-ai' then 'ai-semantica.com'
  when 'slt-agency' then 'slt.agency'
  when 'pixel-plus' then 'pixelplus.ru'
  when 'gaeo' then 'gaeo.ru'
  when 'ashmanov-partners' then 'www.ashmanov.com'
  when 'rush-agency' then 'rush-agency.ru'
  else domain
end;

alter table public.tracked_brands
  alter column domain set not null;

create unique index if not exists tracked_brands_domain_lower_uidx
  on public.tracked_brands (lower(domain));

-- Return every tracked brand for each run/provider/language, including zero mentions.
create or replace view public.v_share_of_voice
with (security_invoker = true)
as
with dimensions as (
  select
    r.id as run_id,
    r.created_at as measured_at,
    p.provider_id,
    tp.language
  from public.measurement_runs r
  join public.ai_responses p on p.run_id = r.id
  join public.test_prompts tp on tp.id = p.prompt_id
  where p.response_status = 'success'
  group by r.id, r.created_at, p.provider_id, tp.language
),
response_counts as (
  select
    p.run_id,
    p.provider_id,
    tp.language,
    count(*)::bigint as successful_responses
  from public.ai_responses p
  join public.test_prompts tp on tp.id = p.prompt_id
  where p.response_status = 'success'
  group by p.run_id, p.provider_id, tp.language
),
brand_totals as (
  select
    d.run_id,
    d.provider_id,
    d.language,
    m.brand_id,
    sum(m.mention_count)::bigint as mentions,
    sum(m.recommendation_count)::bigint as recommendations
  from dimensions d
  join public.ai_responses p
    on p.run_id = d.run_id
   and p.provider_id = d.provider_id
   and p.response_status = 'success'
  join public.test_prompts tp
    on tp.id = p.prompt_id
   and tp.language = d.language
  join public.response_brand_metrics m on m.response_id = p.id
  group by d.run_id, d.provider_id, d.language, m.brand_id
),
citation_totals as (
  select
    d.run_id,
    d.provider_id,
    d.language,
    c.brand_id,
    count(*)::bigint as citations
  from dimensions d
  join public.ai_responses p
    on p.run_id = d.run_id
   and p.provider_id = d.provider_id
   and p.response_status = 'success'
  join public.test_prompts tp
    on tp.id = p.prompt_id
   and tp.language = d.language
  join public.response_citations c on c.response_id = p.id
  where c.brand_id is not null
  group by d.run_id, d.provider_id, d.language, c.brand_id
),
brand_grid as (
  select
    d.run_id,
    d.measured_at,
    d.provider_id,
    d.language,
    b.id as brand_id,
    b.name as brand_name,
    coalesce(bt.mentions, 0)::bigint as mentions,
    coalesce(bt.recommendations, 0)::bigint as recommendations,
    coalesce(ct.citations, 0)::bigint as citations,
    coalesce(rc.successful_responses, 0)::bigint as successful_responses
  from dimensions d
  cross join public.tracked_brands b
  left join brand_totals bt
    on bt.run_id = d.run_id
   and bt.provider_id = d.provider_id
   and bt.language = d.language
   and bt.brand_id = b.id
  left join citation_totals ct
    on ct.run_id = d.run_id
   and ct.provider_id = d.provider_id
   and ct.language = d.language
   and ct.brand_id = b.id
  left join response_counts rc
    on rc.run_id = d.run_id
   and rc.provider_id = d.provider_id
   and rc.language = d.language
)
select
  run_id,
  measured_at,
  provider_id,
  language,
  brand_id,
  brand_name,
  mentions,
  case
    when sum(mentions) over (partition by run_id, provider_id, language) = 0
      then 0::numeric
    else round(
      100.0 * mentions::numeric /
      sum(mentions) over (partition by run_id, provider_id, language),
      2
    )
  end as share_of_voice_pct,
  recommendations,
  citations,
  successful_responses
from brand_grid;

revoke all on public.v_share_of_voice from anon, authenticated;
grant select on public.v_share_of_voice to service_role;
