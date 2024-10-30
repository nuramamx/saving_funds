--drop function process.statement_report_list;
create or replace function process.statement_report_list(
  in p_associate_id integer
)
returns table (
  "year" integer,
  initial_balance numeric(20,6),
  contribution_summarized numeric(20,6),
  annual_interest_rate numeric(20,6),
  yields numeric(20,6),
  withdrawals_summarized numeric(20,6),
  refund numeric(20,6),
  net_total numeric(20,6)
) as $$
declare
  v_saving_fund_id integer;
  v_current_year integer;
  v_year_first_contribution integer;
  v_year_last_contribution integer;
  v_year_iterated integer;
begin
  -- Get the saving fund related to the associate,
  select
    s.id
  into v_saving_fund_id
  from process.saving_fund as s
  where s.associate_id = p_associate_id;

  if v_saving_fund_id is null or v_saving_fund_id <= 0 then
    raise exception 'No existe fondo de ahorro para el socio.';
  end if;

  -- Get the year of first contribution.
  select
    extract(year from c.applied_at)::integer
  into v_year_first_contribution
  from process.contribution as c
  where c.saving_fund_id = v_saving_fund_id
  order by c.applied_at
  limit 1;

  if v_year_first_contribution is null or v_year_first_contribution <= 0 then
    raise exception 'No se localizó la primer aportación al fondo de ahorro.';
  end if;

  -- Get the current year.
  v_current_year := (select extract(year from now())::integer);

  -- Create a temporary table.
  drop table if exists temp_report_statement;
  create temporary table temp_report_statement (
    "year" integer not null,
    initial_balance numeric(20,2) default 0,
    contribution_summarized numeric(20,2) not null,
    annual_interest_rate numeric(20,2) default 0,
    yields numeric(20,2) not null,
    withdrawals_summarized numeric(20,2) default 0,
    refund numeric(20,2) default 0,
    net_total numeric(20,2) default 0
  );

  -- Iterate through years to get the summarized data.
  for v_year_iterated in v_year_first_contribution..v_current_year loop
    insert into temp_report_statement ("year", contribution_summarized, yields, withdrawals_summarized)
    select
      r.year::integer as "year"
      ,sum(case when r.transaction_type = 'contribution' then r.amount else 0 end) as contribution_summarized
      ,sum(r.partial_yields) as yields_summarized
      ,sum(case when r.transaction_type like '%withdrawal%' then r.amount else 0 end) as withdrawals_summarized
    from process.contribution_get_accrued_yields_detailed(v_saving_fund_id, v_year_iterated) as r
    group by
      r.year;
  end loop;

  -- Assign the annual interest rate by year.
  for v_year_iterated in v_year_first_contribution..v_current_year loop
    update temp_report_statement
      set annual_interest_rate = (
          select
            ar.rate
          from "system".saving_fund_annual_rate as ar
          where ar."year" = v_year_iterated
          limit 1
        )
    where temp_report_statement."year" = v_year_iterated;
  end loop;

  -- Assign the net total by year.
  for v_year_iterated in v_year_first_contribution..v_current_year loop
    update temp_report_statement
      set net_total = (
          select
            coalesce((trs.contribution_summarized + trs.yields - abs(trs.withdrawals_summarized)), 0)
          from temp_report_statement as trs
          where trs.year = v_year_iterated
          limit 1
        )
    where temp_report_statement."year" = v_year_iterated;
  end loop;

  -- Assign the initial balance by year, it is the net_total from past year.
  for v_year_iterated in v_year_first_contribution..v_current_year loop
    update temp_report_statement
      set initial_balance = (
          select
            (coalesce(trs.initial_balance, 0) + coalesce(trs.net_total, 0))
          from temp_report_statement as trs
          where trs.year = (v_year_iterated - 1)
          limit 1
        )
    where temp_report_statement."year" = v_year_iterated;
  end loop;

  -- Check last contribution year
  v_year_last_contribution := (select t.year from temp_report_statement as t order by t.year desc limit 1);

  -- Check if temp table has data in the past year, if not, copy last year with data.
  if (select count(1) from temp_report_statement as t where t.year = v_current_year) = 0 then
    -- Check last contribution year
    v_year_last_contribution := (select t.year from temp_report_statement as t order by t.year desc limit 1);

    for v_year_iterated in v_year_last_contribution..(v_current_year-1) loop
      insert into temp_report_statement (
        year,
        initial_balance,
        contribution_summarized,
        annual_interest_rate,
        yields,
        withdrawals_summarized,
        refund,
        net_total
      )
      select
        (v_year_iterated+1)
        ,t.initial_balance
        ,0 -- no contributions because is auto-generated
        ,t.annual_interest_rate
        ,0 -- no yields because is auto-generated
        ,0 -- no withdrawals because is auto-generated
        ,t.refund
        ,t.net_total
      from temp_report_statement as t
      where t.year = v_year_iterated;
    end loop;
  end if;

  return query
  select
    t.year
    ,coalesce(t.initial_balance, 0)
    ,coalesce(t.contribution_summarized, 0)
    ,coalesce(t.annual_interest_rate, 0)
    ,coalesce(t.yields, 0)
    ,coalesce(t.withdrawals_summarized, 0)
    ,coalesce(t.refund, 0)
    ,coalesce(coalesce(t.initial_balance, 0) + t.net_total, 0)
  from temp_report_statement as t;
end;
$$ language plpgsql;