--drop function process.contribution_get_accrued_interest_detailed;
create or replace function process.contribution_get_accrued_interest_detailed(
  in p_saving_fund_id integer,
  in p_year integer default null
) returns table (
  "year" integer,
  transaction_date text,
  amount numeric(20,6),
  transaction_type text,
  running_balance numeric(20,6),
  partial_interest numeric(20,6)
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
    union all
    select
      w.applied_at as transaction_date
      ,-w.amount
      ,'withdrawal' as transaction_type
    from process.withdrawal as w
    where w.is_interest = false
    union all
    select
      w.applied_at as transaction_date
      ,-w.amount
      ,'withdrawal-interest' as transaction_type
    from process.withdrawal as w
    where w.is_interest = true
  ),
  sorted_transactions as (
    select
      t.transaction_date
      ,t.amount
      ,t.transaction_type
      ,sum(t.amount) over (order by t.transaction_date rows between unbounded preceding and current row) as running_balance
      ,extract(year from t.transaction_date) as year
    from transaction_data as t
    where t.transaction_type <> 'withdrawal-interest'
    union all
    select
      t.transaction_date
      ,t.amount
      ,t.transaction_type
      ,sum(t.amount) over (order by t.transaction_date rows between unbounded preceding and current row) as running_balance
      ,extract(year from t.transaction_date) as year
    from transaction_data as t
    where t.transaction_type = 'withdrawal-interest'
  ),
  yearly_interest_calculation as (
    select
      s."year"
      ,max(s.running_balance) as end_of_year_balance
      ,count(s.*) filter (where s.transaction_type = 'contribution') as contribution_count
    from sorted_transactions as s
    where s.transaction_type = 'contribution'
    group by s."year"
  ),
  interest_distribution as (
    select
      s.transaction_date
      ,s.amount
      ,s.transaction_type
      ,s.running_balance
      ,s."year"
      ,y.end_of_year_balance
      ,y.contribution_count
      ,case
        when s.transaction_type = 'contribution' and extract(year from s.transaction_date) < extract(year from current_date) then
          -- distribute the annual interest proportionally based on the number of contributions in the year
          (y.end_of_year_balance * 0.11) / y.contribution_count
        else
          0
      end as partial_interest
    from sorted_transactions as s
    left join yearly_interest_calculation as y on s."year" = y."year"
  )
  select
      r."year"::integer
      ,to_char(r.transaction_date, 'YYYY-MM-dd HH24:MI:SS') as transaction_date
      ,r.amount::numeric(20,6)
      ,r.transaction_type::text
      ,r.running_balance::numeric(20,6)
      ,r.partial_interest::numeric(20,6)
  from interest_distribution as r
  where p_year is null or r."year"::integer = p_year
  order by r.transaction_date;
end;
$$ language plpgsql;
