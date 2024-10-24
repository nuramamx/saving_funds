--drop view if exists system.saving_fund_annual_rate_list_view;
create or replace view "system".saving_fund_annual_rate_list_view as
  select
    a.id
    ,a."year"
    ,a.rate
  from "system".saving_fund_annual_rate as a
  where a.year >= extract(year from current_date)
  order by a."year";