--drop view if exists system.agreement_list_view;
create or replace view "system".agreement_list_view as
  select a.id
    ,a."name"
  from "system".agreement as a;