--drop function catalog.associate_list_by_id_or_name;
create or replace function "catalog".associate_list_by_id_or_name(
  in p_associate_id integer,
  in p_name text
)
returns table (
  id integer,
  rfc text,
  "name" text,
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
    ,a.rfc::text as rfc
    ,a."name"::text as "name"
    ,ag."name" AS agreement_name
  from "catalog".associate as a
  join "system".agreement as ag
    on (a.detail->>'agreementId')::integer = ag.id
  where (p_associate_id = 0 or p_associate_id = a.id)
  and (p_name = '' or a."name" like '%' || upper(p_name) || '%');
end;
$$ language plpgsql;