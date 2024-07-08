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
    A.id
    ,replace(A.name->>'firstname', '"', '') || ' ' ||
      replace(A.name->>'paternal_lastname', '"', '') || ' ' ||
      replace(A.name->>'maternal_lastname', '"', '') as fullname
    ,(ADDR.street || ', ' || ADDR.settlement || ', C.P. ' || ADDR.postal_code || ', ' || CI.name) as address
    ,AG.name AS agreement_name
  from catalog.associate A
  join catalog.associate_detail AD
    on AD.associate_id = A.id
  join catalog.address ADDR
    on ADDR.associate_id = A.id
  join administration.agreement AG
    on AG.id = AD.agreement_id
  join administration.city CI
    on CI.id = ADDR.city_id
  where 1=1
  and (associate_search_by_id_or_name.associate_id = 0 or associate_search_by_id_or_name.associate_id = A.id)
  and (associate_search_by_id_or_name.name = '' or (A.name->>'firstname') || ' ' ||
    (A.name->>'paternal_lastname')  || ' ' ||
    (A.name->>'maternal_lastname') like '%' || upper(associate_search_by_id_or_name.name) || '%');
end;
$$ language plpgsql;