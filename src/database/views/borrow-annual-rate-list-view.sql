--drop view if exists system.borrow_annual_rate_list_view;
create or replace view "system".borrow_annual_rate_list_view as
  select
    a.id
    ,a.rate
    ,a."period"
  from "system".borrow_annual_rate as a
  order by a."period" asc;