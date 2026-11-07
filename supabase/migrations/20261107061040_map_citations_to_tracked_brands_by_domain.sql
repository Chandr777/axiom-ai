create or replace function public.assign_citation_brand_from_domain()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
declare
  normalized_domain text;
begin
  if new.brand_id is not null then
    return new;
  end if;

  normalized_domain := lower(
    split_part(
      regexp_replace(
        coalesce(nullif(new.domain, ''), nullif(new.url, '')),
        '^https?://',
        '',
        'i'
      ),
      '/',
      1
    )
  );

  normalized_domain := split_part(normalized_domain, ':', 1);
  normalized_domain := regexp_replace(normalized_domain, '^www\.', '');

  if normalized_domain is null or normalized_domain = '' then
    return new;
  end if;

  select b.id
    into new.brand_id
  from public.tracked_brands b
  where regexp_replace(lower(b.domain), '^www\.', '') = normalized_domain
  limit 1;

  return new;
end;
$$;

drop trigger if exists response_citations_assign_brand
  on public.response_citations;

create trigger response_citations_assign_brand
before insert or update of domain, url, brand_id
on public.response_citations
for each row
execute function public.assign_citation_brand_from_domain();
