--drop function process.saving_fund_transaction_list;
create or replace function process.saving_fund_transaction_list(
  in p_saving_fund_id integer,
  in p_year integer default null
) returns table (
  "year" integer,
  transaction_date text,
  amount numeric(20,6),
  transaction_type text,
  running_balance numeric(20,6),
  net_balance numeric(20,6),
  partial_yields numeric(20,6)
) as $$
declare
begin 
  return query
  select
    r."year"
    ,r.transaction_date
    ,r.amount
    ,r.transaction_type
    ,r.running_balance
    ,r.net_balance
    ,r.partial_yields
  from process.contribution_get_accrued_yields_detailed(p_saving_fund_id, p_year) as r;
end;
$$ language plpgsql;
