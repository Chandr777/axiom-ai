create index if not exists ai_responses_run_idx
  on public.ai_responses (run_id);
create index if not exists ai_responses_prompt_idx
  on public.ai_responses (prompt_id);
create index if not exists ai_responses_provider_idx
  on public.ai_responses (provider_id);
create index if not exists measurement_runs_created_idx
  on public.measurement_runs (created_at desc);
create index if not exists response_brand_metrics_response_idx
  on public.response_brand_metrics (response_id);
create index if not exists response_brand_metrics_brand_idx
  on public.response_brand_metrics (brand_id);
create index if not exists response_citations_response_idx
  on public.response_citations (response_id);
create index if not exists response_citations_brand_idx
  on public.response_citations (brand_id);
create index if not exists test_prompts_language_active_idx
  on public.test_prompts (language, is_active);
create unique index if not exists tracked_brands_one_own_brand
  on public.tracked_brands (is_own_brand)
  where is_own_brand;

create or replace view public.v_share_of_voice
with (security_invoker = true)
as
select
  r.id as run_id,
  r.created_at as measured_at,
  p.provider_id,
  tp.language,
  b.id as brand_id,
  b.name as brand_name,
  sum(m.mention_count) as mentions,
  case
    when sum(sum(m.mention_count)) over (
      partition by r.id, p.provider_id, tp.language
    ) = 0 then 0::numeric
    else round(
      100.0 * sum(m.mention_count)::numeric /
      sum(sum(m.mention_count)) over (
        partition by r.id, p.provider_id, tp.language
      ),
      2
    )
  end as share_of_voice_pct
from public.response_brand_metrics m
join public.ai_responses p on p.id = m.response_id
join public.measurement_runs r on r.id = p.run_id
join public.test_prompts tp on tp.id = p.prompt_id
join public.tracked_brands b on b.id = m.brand_id
group by r.id, r.created_at, p.provider_id, tp.language, b.id, b.name;

revoke all on public.v_share_of_voice from anon, authenticated;
grant select on public.v_share_of_voice to service_role;
