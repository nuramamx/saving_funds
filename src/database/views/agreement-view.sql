drop view if exists administration.agreement_view;
create or replace view administration.agreement_view as
  select a.id
    ,a."name"
  from administration.agreement as a;