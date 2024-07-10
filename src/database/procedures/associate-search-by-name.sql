--drop function catalog.associate_search_by_id_or_name;
create or replace function catalog.associate_search_by_id_or_name(
  in associate_id integer,
  in name text
)
returns table (
  id integer,
  fullname text,
  address text,
  agreement_name varchar(50)
) as $$
declare
begin
  if associate_id = 0 and name = '' then
    return;
  end if;
  
  return query
  select
    a.id
    ,deconstruct_name(a."name") as fullname
    ,(addr.street || ', ' || addr.settlement || ', C.P. ' || addr.postal_code || ', ' || c.name) as address
    ,ag.name AS agreement_name
  from catalog.associate a
  join catalog.associate_detail ad
    on ad.associate_id = a.id
  join catalog.address addr
    on addr.associate_id = a.id
  join administration.agreement ag
    on ag.id = ad.agreement_id
  join administration.city c
    on c.id = addr.city_id
  where 1=1
  and (associate_search_by_id_or_name.associate_id = 0 or associate_search_by_id_or_name.associate_id = a.id)
  and (associate_search_by_id_or_name.name = '' or deconstruct_name(a."name") like '%' || upper(associate_search_by_id_or_name.name) || '%');
end;
$$ language plpgsql;