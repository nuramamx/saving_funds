--drop view if exists catalog.associate_list_view;
create or replace view "catalog".associate_list_view as
  select 
    a.id
    ,a."name"
    ,a.rfc
    ,a.address->>'street' as address
    ,a.detail->>'dependencyKey' as dependency_key
    ,a.detail->>'category' as category
    ,ag."name" as agreement_name
    ,a.detail->>'salary' as salary
  from "catalog".associate as a
  join "system".agreement as ag on (a.detail->>'agreementId')::integer = ag.id
  order by a.id;