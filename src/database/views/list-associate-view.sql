drop view if exists "catalog".list_associate_view;
create or replace view "catalog".list_associate_view as
  select 
    a.id
    ,name_deconstruct(a."name") as fullname
    ,a.rfc
    ,(addr.street || ', ' || addr.settlement || ', C.P. ' || addr.postal_code || ', ' || c."name") as address
    ,ad.dependency_key
    ,ad.category
    ,ag."name" as agreement_name
    ,ad.salary
  from "catalog".associate as a
  join "catalog".address as addr on a.id = addr.associate_id
  join "catalog".associate_detail as ad on a.id = ad.associate_id
  join administration.agreement as ag on ad.agreement_id = ag.id
  join administration.city as c on c.id = addr.city_id
  order by a.id;