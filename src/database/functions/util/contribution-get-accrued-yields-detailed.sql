--drop function process.contribution_get_accrued_yields_detailed;
create or replace function process.contribution_get_accrued_yields_detailed(
  in p_saving_fund_id integer,
  in p_year integer default 0
) returns table (
  id integer,
  "year" integer,
  transaction_date text,
  applied_at timestamp with time zone,
  amount numeric(20,6),
  transaction_type text,
  running_balance numeric(20,6),
  net_balance numeric(20,6),
  partial_yields numeric(20,6)
) as $$
declare
  v_last_year integer := null;
  v_running_balance numeric(20,6) := 0;
  v_withdrawals_current_year numeric(20,6) := 0;
  v_contributions_previous_year numeric(20,6) := 0;
  v_contributions_previous_year_without_withdrawals numeric(20,6) := 0;
  v_running_net_balance numeric(20,6) := 0;
  v_last_net_balance numeric(20,6) := 0;
  v_last_net_balance_previous_year numeric(20,6) := 0;
  v_yields_year numeric(20,6) := 0;
  v_annual_rate numeric(20,6);
  v_first_contribution boolean := false;
  v_first_transaction boolean := false;
  v_current_year_transactions integer := 0;
  r record;
begin
  -- Create a temporary table to store results before returning them
  drop table if exists temp_transactions_data;
  create temp table temp_transactions_data (
    id integer,
    year integer,
    transaction_date text,
    applied_at timestamp with time zone,
    amount numeric(20,6),
    transaction_type text,
    running_balance numeric(20,6) default 0,
    net_balance numeric(20,6) default 0,
    partial_yields numeric(20,6) default 0
  ) on commit drop;

  drop table if exists temp_yields_year;
  create temp table temp_yields_year (
    year integer,
    yields numeric(20,6) default 0
  ) on commit drop;

  v_current_year_transactions := (
    select
      count(1)
    from process.contribution as c
    where extract(year from c.applied_at) = extract(year from current_date)
  );

  -- Cursor to process transactions year by year
  for r in (
    select
      c.id as id
      ,extract(year from c.applied_at) as year
      ,to_char(c.applied_at, 'YYYY-MM-DD') as transaction_date
      ,c.applied_at as applied_at
      ,c.amount as amount
      ,'contribution' as transaction_type
    from process.contribution as c
    where c.saving_fund_id = p_saving_fund_id
    and c.is_active = true
    union all
    select
      w.id as id
      ,extract(year from w.applied_at) as year
      ,to_char(w.applied_at, 'YYYY-MM-DD') as transaction_date
      ,w.applied_at as applied_at
      ,-w.amount as amount
      ,'withdrawal' as transaction_type
    from process.withdrawal as w
    where w.saving_fund_id = p_saving_fund_id and w.is_yields = false
    and w.is_active = true
    union all
    select
      -1
      ,extract(year from current_date)
      ,to_char(current_date, 'YYYY-MM-DD')
      ,current_date
      ,0
      ,''
    from (select v_current_year_transactions > 0) as x
    order by applied_at
  ) loop
    if v_last_year is null then
      v_first_contribution := true;
    end if;

    -- Check if we're in a new year
    if r.year <> v_last_year then
      -- Get the annual rate for the previous year
      select rt.rate into v_annual_rate
      from "system".saving_fund_annual_rate rt
      where rt.year = v_last_year
      limit 1;

      -- Get all contributions from previous year and calculate yields
      if v_first_contribution then
        v_yields_year := 0;
        v_first_contribution := false;
      else
        -- Get the withdrawals of current year
        v_withdrawals_current_year := (
          select
            coalesce(sum(abs(w.amount)), 0)
          from process.withdrawal as w
          where extract(year from w.applied_at) = r.year
          and w.saving_fund_id = p_saving_fund_id
          and is_yields = false
        );

        -- Get all contributions from previous year
        v_contributions_previous_year := (
          select
            coalesce(sum(c.amount), 0)
          from temp_transactions_data as c
          where c.year = v_last_year
          and c.transaction_type = 'contribution'
          and c.net_balance > 0
        );

        -- Calculate previous year contributions - current withdrawals
        v_contributions_previous_year_without_withdrawals := (
          select
            c.total - v_withdrawals_current_year
          from (
            select
              coalesce(c.net_balance, 0) as total
            from temp_transactions_data as c
            where c.year = r.year
            and c.transaction_type = 'contribution'
            order by c.applied_at, c.id desc
            limit 1
          ) as c
        );

        -- Get the last net balance (current year)
        v_last_net_balance := (
          select
            c.net_balance
          from temp_transactions_data as c
          where c.year = r.year
          and c.transaction_type = 'contribution'
          order by c.id desc
          limit 1
        );

        -- Get the last net balance from previous year
        v_last_net_balance_previous_year := (
          select
            c.net_balance
          from temp_transactions_data as c
          where c.year = v_last_year
          and c.transaction_type = 'contribution'
          order by c.applied_at desc
          limit 1
        );

        -- Check if withdrawals exceed the last net balance from previous year and has negative running net balance cause withdrawals
        if v_withdrawals_current_year > v_last_net_balance_previous_year and v_last_net_balance_previous_year < 0 then
          v_yields_year := 0;
        -- If running balance is 0 or negative, does not calculate yields
        elseif v_running_net_balance <= 0 then
          v_yields_year := 0;
        else
          -- Calculate yields of previous year
          v_yields_year := greatest(((v_contributions_previous_year * v_annual_rate) / 100), 0);
        end if;

        -- Save calculated yields
        insert into temp_yields_year (year, yields)
        values (
          v_last_year
          ,v_yields_year
        );
      end if;

      v_first_transaction := true;
    end if;

    -- Calculate yearly yields
    if r.transaction_type = 'contribution' then
      v_running_balance := v_running_balance + r.amount;

      if v_first_transaction = true then
        -- Update net balance to integrate yields
        v_running_net_balance := v_running_net_balance + r.amount + v_yields_year;
        v_yields_year := 0;
        v_first_transaction := false;
      else
        v_running_net_balance := v_running_net_balance + r.amount;
      end if;
    end if;

    if r.transaction_type = 'withdrawal' then
      v_running_balance := v_running_balance + r.amount;
      v_running_net_balance := v_running_net_balance + r.amount;
    end if;

    --insert transaction
    insert into temp_transactions_data (id, year, transaction_date, applied_at, amount, transaction_type, running_balance, net_balance, partial_yields)
    values (
      r.id
      ,r.year
      ,r.transaction_date
      ,r.applied_at
      ,r.amount
      ,r.transaction_type
      ,v_running_balance
      ,v_running_net_balance
      ,0
    );

    -- Update last year for the next loop iteration
    v_last_year := r.year;
  end loop;

  -- Update partial yields
  update temp_transactions_data
    set
      partial_yields = tyy.yields
  from temp_yields_year as tyy
  where temp_transactions_data.year = tyy.year
  and temp_transactions_data.id = (
    select
      ttd.id
    from temp_transactions_data as ttd
    where ttd.year = tyy.year
    order by ttd.applied_at
    limit 1
  );

  -- Delete last simulated transaction, this is only when associate does not have contribution or withdrawal in
  -- current year so that causes previous year does not generate yields.
  delete from temp_transactions_data as t where t.id = -1;

  -- Return results
  return query
  select
    res.id
    ,res.year
    ,res.transaction_date
    ,res.applied_at
    ,res.amount
    ,res.transaction_type
    ,res.running_balance
    ,res.net_balance
    ,res.partial_yields
  from temp_transactions_data as res
  where (p_year = 0 or res.year = p_year)
  order by res.applied_at;
end
$$ language plpgsql;