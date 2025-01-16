--drop function process.contribution_get_accrued_yields_detailed;
create or replace function process.contribution_get_accrued_yields_detailed(
  in p_saving_fund_id integer,
  in p_year integer default 0
) returns table (
  id integer,
  "year" integer,
  transaction_date text,
  amount numeric(20,6),
  rate numeric(20,6),
  transaction_type text,
  running_balance numeric(20,6),
  net_balance numeric(20,6),
  partial_yields numeric(20,6)
) as $$
declare
  v_id_first_contribution integer;
begin
  -- Get the year of first contribution.
  select
    c.id
  into
    v_id_first_contribution
  from process.contribution as c
  where c.saving_fund_id = p_saving_fund_id
  order by c.applied_at
  limit 1;

  return query
  with transaction_data as (
    -- Collect all contributions and withdrawals
    select
      c.id,
      c.applied_at as transaction_date,
      c.amount,
      case
        when c.amount > 0 then 'contribution'
        else 'fix'
      end as transaction_type
    from process.contribution as c
    where c.saving_fund_id = p_saving_fund_id
    union all
    select
      w.id,
      w.applied_at as transaction_date,
      -w.amount,
      'withdrawal' as transaction_type
    from process.withdrawal as w
    where w.saving_fund_id = p_saving_fund_id and w.is_yields = false
    union all
    select
      w.id,
      w.applied_at as transaction_date,
      -w.amount,
      'withdrawal-yields' as transaction_type
    from process.withdrawal as w
    where w.saving_fund_id = p_saving_fund_id and w.is_yields = true
  ),
  sorted_transactions as (
    -- Calculate running balance and year for each transaction
    select
      t.id,
      t.transaction_date,
      t.amount,
      t.transaction_type,
      sum(t.amount) over (order by t.transaction_date rows between unbounded preceding and current row) as running_balance,
      extract(year from t.transaction_date) as "year"
    from transaction_data as t
  ),
  yearly_totals as (
    -- Calculate yearly end balance, contributions, and yields
    select
      s.year,
      max(s.running_balance) as end_of_year_balance,
      sum(case when s.transaction_type = 'contribution' and s.id <> v_id_first_contribution then s.amount else 0 end) as yearly_contributions
    from sorted_transactions as s
    group by s.year
  ),
  annual_rates as (
    -- Join annual rates for each year
    select
      r.year,
      r.rate
    from "system".saving_fund_annual_rate as r
    where r.year in (select distinct s.year from sorted_transactions as s)
  ),
  yearly_yields as (
    -- Calculate yearly yields based on end_of_year_balance and rate
    select
      yt.year,
      yt.end_of_year_balance,
      yt.yearly_contributions,
      ((yt.yearly_contributions * ar.rate) / 100) yearly_yields,
      ar.rate
    from yearly_totals yt
    join annual_rates ar on yt.year = ar.year
    left join lateral (
      select
        -coalesce(sum(s.amount),0) as amount
      from sorted_transactions as s
      where s.transaction_type = 'withdrawal'
      and s.year = yt.year
    ) as yearly_withdrawals on true
  ),
  cumulative_yields as (
    -- Calculate cumulative yields up to each year
    select
      yy.year,
      sum(yy.yearly_yields) over (order by yy.year) as previous_yields
    from yearly_yields as yy
  ),
  yields_distribution as (
    -- Join transaction data with yearly yields and cumulative yields
    select
      st.id,
      st.transaction_date,
      st.amount,
      case
        when st.transaction_type = 'contribution'
          then yy.rate
          else 0
      end as rate,
      st.transaction_type,
      st.running_balance,
      st.running_balance + coalesce(yields.amount, 0) as net_balance,
      st.year,
      case
        when st.transaction_type = 'contribution' and st.year < extract(year from current_date)
          then yy.yearly_yields / (select count(*) from sorted_transactions as s where s.year = st.year and s.transaction_type = 'contribution')
          else 0
      end as partial_yields
    from sorted_transactions st
    left join yearly_yields yy on st.year = yy.year
    left join cumulative_yields cy on st.year = cy.year
    left join lateral (
      select
        case
        when st.transaction_type = 'contribution' and st.year < extract(year from current_date)
        then yy.yearly_yields / (select count(*) from sorted_transactions as s where s.year = st.year and s.transaction_type = 'contribution')
        else 0
      end as amount
    ) as yields on true
  )
  select
    r.id::integer
    ,r."year"::integer
    ,to_char(r.transaction_date at time zone 'utc', 'YYYY-MM-dd HH24:MI:SS') as transaction_date
    ,r.amount::numeric(20,6)
    ,r.rate::numeric(20,6)
    ,r.transaction_type::text
    ,r.running_balance::numeric(20,6)
    ,r.net_balance::numeric(20,6)
    ,r.partial_yields::numeric(20,6)
  from yields_distribution as r
  where (p_year = 0 or r.year = p_year)
  order by r.transaction_date;
end;
$$ language plpgsql;
