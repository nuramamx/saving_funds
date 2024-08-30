--drop view if exists administration.annual_rate_list_view;
create or replace view administration.annual_rate_list_view as
  select a.id
    ,a.rate
    ,a."period"
  from administration.annual_rate as a;