--drop function catalog.associate_list;
create or replace function "catalog".associate_list(
  p_id integer = 0,
  p_limit integer = 20,
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
  frequent_contribution numeric(20,6),
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
    ,((a.address->>'street')::text || ', ' || (a.address->>'settlement')::text ||
      ', ' || (a.address->>'town')::text || ', C.P. ' || (a.address->>'postalCode')::text) as address
    ,a.detail->>'dependencyKey' as dependency_key
    ,a.detail->>'category' as category
    ,ag."name" as agreement_name
    ,(a.detail->>'salary')::numeric(20,6) as salary
    ,(a.detail->>'frequentContribution')::numeric(20,6) as frequent_contribution
    ,a.is_active
    ,count(1) over () as total_rows
  from "catalog".associate as a
  join "system".agreement as ag on (a.detail->>'agreementId')::integer = ag.id
  where (p_id = 0 or a.id = p_id)
  order by a.id, a.is_active desc
  limit p_limit offset p_offset;
end;
$$ language plpgsql;
