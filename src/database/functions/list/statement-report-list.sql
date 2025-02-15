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
  v_id_first_contribution integer;
  v_year_first_contribution integer;
  v_year_iterated integer;
  v_row_iterated integer;
  v_first_row integer;
  v_last_row integer;
  v_first_year_row integer;
  v_last_year_row integer;
  v_is_new_associate boolean := false;
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

  -- Workaround for associates registered on 2025 and above
  v_is_new_associate := (
    select
      true
    from catalog.associate as a
    where a.id = p_associate_id
    and extract(year from a.created_at) >= 2025
    limit 1
  );

  raise notice 'v_is_new_associate %', v_is_new_associate;

  -- Get the year of first contribution.
  select
    c.id
    ,extract(year from c.applied_at)::integer
  into
    v_id_first_contribution
    ,v_year_first_contribution
  from process.contribution as c
  where c.saving_fund_id = v_saving_fund_id
  and c.is_active = true
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
    id serial,
    "year" integer not null,
    initial_balance numeric(20,2) default 0,
    contribution_summarized numeric(20,2) not null,
    annual_interest_rate numeric(20,2) default 0,
    yields numeric(20,2) not null,
    withdrawals_summarized numeric(20,2) default 0,
    refund numeric(20,2) default 0,
    net_total numeric(20,2) default 0,
    first_contribution boolean default false,
    is_new_associate boolean default false
  );

  -- Iterate through years to get the summarized data.
  for v_year_iterated in v_year_first_contribution..v_current_year loop
    insert into temp_report_statement ("year", contribution_summarized, yields, withdrawals_summarized, first_contribution, is_new_associate)
    with pre_processed_contributions as (
      select
        r.year::integer as "year"
        ,r.id
        ,r.transaction_type
        ,r.amount
        ,r.partial_yields
        ,case
          when not v_is_new_associate and v_id_first_contribution = r.id then 0
          else r.partial_yields
        end as calculated_yields
        ,case
          when not v_is_new_associate and v_id_first_contribution = r.id then true
          else false
        end as first_contribution
        ,v_is_new_associate as is_new_associate
      from process.contribution_get_accrued_yields_detailed(v_saving_fund_id, v_year_iterated) as r
    )
    select
      r.year::integer as "year"
      ,sum(case when r.transaction_type = 'contribution' then r.amount else 0 end) as contribution_summarized
      ,sum(r.calculated_yields) as yields_summarized
      ,sum(case when r.transaction_type like '%withdrawal%' then r.amount else 0 end) as withdrawals_summarized
      ,r.first_contribution
      ,r.is_new_associate
    from pre_processed_contributions as r
    group by
      r.year
      ,r.first_contribution
      ,r.is_new_associate;
  end loop;

  select min(r.id) from temp_report_statement as r into v_first_row;
  select max(r.id) from temp_report_statement as r into v_last_row;
  select min(r.year) from temp_report_statement as r into v_first_year_row;
  select max(r.year) from temp_report_statement as r into v_last_year_row;

  -- Assign the annual interest rate by year.
  for v_year_iterated in v_first_year_row..v_last_year_row loop
    update temp_report_statement
      set annual_interest_rate = (
          select
            ar.rate
          from "system".saving_fund_annual_rate as ar
          where ar.year = v_year_iterated
          limit 1
        )
    where temp_report_statement.year = v_year_iterated;
  end loop;

  -- Assign the net total by year.
  for v_row_iterated in v_first_row..v_last_row loop
    update temp_report_statement
      set net_total = (
          select
            coalesce((trs.contribution_summarized + trs.yields - abs(trs.withdrawals_summarized)), 0)
          from temp_report_statement as trs
          where trs.id = v_row_iterated
          limit 1
        )
    where temp_report_statement.id = v_row_iterated;
  end loop;

  -- Assign the initial balance by year, it is the net_total from past year.
  for v_row_iterated in v_first_row..v_last_row loop
    update temp_report_statement
      set initial_balance = (
          select
            (coalesce(trs.initial_balance, 0) + coalesce(trs.net_total, 0))
          from temp_report_statement as trs
          where trs.id = (v_row_iterated - 1)
          limit 1
        )
    where temp_report_statement.id = v_row_iterated;
  end loop;

  -- Format data
  update temp_report_statement
    set
      initial_balance = coalesce(temp_report_statement.initial_balance, 0)
      ,contribution_summarized = coalesce(temp_report_statement.contribution_summarized, 0)
      ,annual_interest_rate = case
        when temp_report_statement.first_contribution
          then 0
          else coalesce(temp_report_statement.annual_interest_rate, 0)
        end
      ,yields = coalesce(temp_report_statement.yields, 0)
      ,withdrawals_summarized = coalesce(temp_report_statement.withdrawals_summarized, 0)
      ,net_total = coalesce(coalesce(temp_report_statement.initial_balance, 0) + coalesce(temp_report_statement.net_total, 0), 0);

  -- If current year is not generated by empty transactions, we create it.
  if exists(select 1 from temp_report_statement as t where t.year = extract(year from current_date)) = false then
    insert into temp_report_statement ("year", initial_balance, contribution_summarized, yields, withdrawals_summarized, net_total)
    select
      extract(year from current_date)
      ,t.net_total
      ,0
      ,0
      ,0
      ,t.net_total
    from temp_report_statement as t
    order by t.year desc
    limit 1;
  end if;

  return query
  select
    t.year
    ,t.initial_balance
    ,t.contribution_summarized
    ,t.annual_interest_rate
    ,t.yields
    ,t.withdrawals_summarized
    ,t.refund
    ,t.net_total
  from temp_report_statement as t
  order by t.year;
end;
$$ language plpgsql;