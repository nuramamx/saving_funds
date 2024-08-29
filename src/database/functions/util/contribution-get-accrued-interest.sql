--drop function process.contribution_get_accrued_interest;
create or replace function process.contribution_get_accrued_interest(
  in p_saving_fund_id integer
) returns numeric(20,6) as $$
declare
  v_accrued_interest numeric(20,6);
  v_cummulated_withdrawal_interest numeric(20,6);
begin
  select 
    sum(r.partial_interest)
  into v_accrued_interest
  from process.contribution_get_accrued_interest_detailed(p_saving_fund_id) as r;

  select coalesce(sum(w.amount), 0)
  into v_cummulated_withdrawal_interest
  from process.withdrawal as w
  where w.saving_fund_id = p_saving_fund_id
  and w.is_interest = true;

  return v_accrued_interest - v_cummulated_withdrawal_interest;
end;
$$ language plpgsql;
