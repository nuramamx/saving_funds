--drop function process.contribution_get_accrued_yields;
create or replace function process.contribution_get_accrued_yields(
  in p_saving_fund_id integer
) returns numeric(20,6) as $$
declare
  v_accrued_yields numeric(20,6);
  v_cummulated_withdrawal_yields numeric(20,6);
begin
  select 
    sum(r.partial_yields)
  into v_accrued_yields
  from process.contribution_get_accrued_yields_detailed(p_saving_fund_id) as r;

  select coalesce(sum(w.amount), 0)
  into v_cummulated_withdrawal_yields
  from process.withdrawal as w
  where w.saving_fund_id = p_saving_fund_id
  and w.is_yields = true
  and w.is_active = true;

  return v_accrued_yields - v_cummulated_withdrawal_yields;
end;
$$ language plpgsql;
