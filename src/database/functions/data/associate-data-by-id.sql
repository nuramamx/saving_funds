--drop function catalog.associate_data_by_id
create or replace function catalog.associate_data_by_id(
  p_id integer
)
returns table (
  id integer,
  name text,
  rfc text,
  gender text,
  "detail" jsonb,
  address jsonb,
  workplace jsonb,
  beneficiaries jsonb
) as $$
declare
begin
  return query
  select
    a.id
    ,a.name::text
    ,a.rfc::text
    ,a.gender::text
    ,a.detail
    ,a.address
    ,a.workplace
    ,a.beneficiaries
  from catalog.associate as a
  where a.id = p_id
  limit 1;
end;
$$ language plpgsql;