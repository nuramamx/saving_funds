--drop function process.contribution_get_accrued_yields_detailed;
create or replace function process.contribution_get_accrued_yields_detailed(
  in p_saving_fund_id integer,
  in p_year integer default 0
) returns table (
  "year" integer,
  transaction_date text,
  amount numeric(20,6),
  rate numeric(20,6),
  transaction_type text,
  running_balance numeric(20,6),
  partial_yields numeric(20,6)
) as $$
declare
begin
  return query
  with transaction_data as (
    select
      c.applied_at as transaction_date
      ,c.amount
      ,'contribution' as transaction_type
    from process.contribution as c
    where c.saving_fund_id = p_saving_fund_id
    union all
    select
      w.applied_at as transaction_date
      ,-w.amount
      ,'withdrawal' as transaction_type
    from process.withdrawal as w
    where w.saving_fund_id = p_saving_fund_id
    and w.is_yields = false
    union all
    select
      w.applied_at as transaction_date
      ,-w.amount
      ,'withdrawal-yields' as transaction_type
    from process.withdrawal as w
    where w.saving_fund_id = p_saving_fund_id
    and w.is_yields = true
  ),
  sorted_transactions as (
    select
      t.transaction_date
      ,t.amount
      ,t.transaction_type
      ,sum(t.amount) over (order by t.transaction_date rows between unbounded preceding and current row) as running_balance
      ,transaction_detail.year
    from transaction_data as t
    left join lateral (
      select extract(year from t.transaction_date) as year
    ) transaction_detail on true
    --where (p_year = 0 or transaction_detail.year = p_year)
  ),
  yearly_contributions as (
    select
      transaction_detail.year
      ,sum(s.amount) as yearly_contributions
    from sorted_transactions as s
    left join lateral (
      select extract(year from s.transaction_date) as year
    ) transaction_detail on true
    where s.transaction_type = 'contribution'
    --and (p_year = 0 or transaction_detail.year = p_year)
    group by transaction_detail.year
  ),
  yearly_yields_calculation as (
    select
      s."year"
      ,max(s.running_balance) as end_of_year_balance
      ,count(s.*) filter (where s.transaction_type = 'contribution') as contribution_count
      ,yc.yearly_contributions
    from sorted_transactions as s
    left join yearly_contributions yc on s.year = yc.year
    where s.transaction_type = 'contribution'
    --and (p_year = 0 or s.year = p_year)
    group by
      s."year"
      ,yc.yearly_contributions
  ),
  yields_distribution as (
    select
      s.transaction_date
      ,s.amount
      ,annual_rate.rate
      ,s.transaction_type
      ,s.running_balance
      ,s."year"
      ,y.end_of_year_balance
      ,y.contribution_count
      ,case
        when s.transaction_type = 'contribution' and extract(year from s.transaction_date) < extract(year from current_date) then
          -- distribute the annual yields proportionally based on the number of contributions in the year
          ((y.yearly_contributions * annual_rate.rate) / 100) / y.contribution_count
        else
          0
      end as partial_yields
    from sorted_transactions as s
    left join yearly_yields_calculation as y on s."year" = y."year"
    left join lateral (
      select
        ar.rate
      from "system".saving_fund_annual_rate as ar
      where ar.year = s.year
      limit 1
    ) as annual_rate on true
  )
  select
      r."year"::integer
      ,to_char(r.transaction_date at time zone 'utc', 'YYYY-MM-dd HH24:MI:SS') as transaction_date
      ,r.amount::numeric(20,6)
      ,r.rate::numeric(20,6)
      ,r.transaction_type::text
      ,r.running_balance::numeric(20,6)
      ,r.partial_yields::numeric(20,6)
  from yields_distribution as r
  where (p_year = 0 or r."year"::integer = p_year)
  order by r.transaction_date;
end;
$$ language plpgsql;
