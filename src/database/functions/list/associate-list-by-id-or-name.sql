--drop function catalog.associate_list_by_id_or_name;
create or replace function "catalog".associate_list_by_id_or_name(
  in p_associate_id integer,
  in p_name text
)
returns table (
  id integer,
  "name" text,
  address text,
  agreement_name varchar(50)
) as $$
declare
begin
  if p_associate_id = 0 and p_name = '' then
    return;
  end if;
  
  return query
  select
    a.id
    ,a."name"::text as "name"
    ,((a.address->>'street')::text || ', ' || (a.address->>'settlement')::text || ', C.P. ' || (a.address->>'postalCode')::text)::text as address
    ,ag."name" AS agreement_name
  from "catalog".associate as a
  join "system".agreement as ag
    on (a.detail->>'agreementId')::integer = ag.id
  where 1=1
  and (p_associate_id = 0 or p_associate_id = a.id)
  and (p_name = '' or a."name" like '%' || upper(p_name) || '%');
end;
$$ language plpgsql;