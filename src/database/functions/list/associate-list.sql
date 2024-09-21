--drop function catalog.associate_list;
create or replace function "catalog".associate_list(
  p_limit integer = 10,
  p_offset integer = 0
)
returns table (
  id integer,
  "name" varchar,
  rfc varchar,
  address text,
  dependency_key text,
  category text,
  agreement_name varchar,
  salary numeric(20,6),
  is_active boolean,
  total_rows bigint
) as $$
declare
begin
  return query
  select 
    a.id
    ,a."name"
    ,a.rfc
    ,a.address->>'street' as address
    ,a.detail->>'dependencyKey' as dependency_key
    ,a.detail->>'category' as category
    ,ag."name" as agreement_name
    ,(a.detail->>'salary')::numeric(20,6) as salary
    ,a.is_active
    ,count(1) over () as total_rows
  from "catalog".associate as a
  join "system".agreement as ag on (a.detail->>'agreementId')::integer = ag.id
  order by a.id asc, a.is_active desc
  limit p_limit offset p_offset;
end;
$$ language plpgsql;
