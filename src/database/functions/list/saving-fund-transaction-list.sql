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
  partial_interest numeric(20,6)
) as $$
declare
begin 
  return query
  select
    r.*
  from process.contribution_get_accrued_interest_detailed(p_saving_fund_id, p_year) as r;
end;
$$ language plpgsql;
