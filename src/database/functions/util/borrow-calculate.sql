--drop function process.borrow_calculate;
create or replace function process.borrow_calculate(
  p_requested_amount numeric(20,6),
  p_annual_rate numeric(20,6),
  p_period integer,
  p_is_fortnightly boolean
)
returns process.borrow_type as $$
declare
  v_borrow process.borrow_type;
  v_calculated_due_2 numeric(20,6);
  v_calculated_interest_1 numeric(20,6);
  v_calculated_interest_2 numeric(20,6);
  v_calculated_interest_3 numeric(20,6);
begin
  v_borrow.guarantee_fund := (p_requested_amount * 2) / 100;
  
  if p_period = 1 then
    v_calculated_interest_1 := (p_requested_amount * p_annual_rate / 100);
    v_borrow.number_payments := case 
      when p_s_fortnightly then 24
      else 12
    end;

    v_borrow.total_due := p_requested_amount + v_calculated_interest_1;
    v_borrow.interests := v_calculated_interest_1; 
    v_borrow.payment := v_borrow.total_due / v_borrow.number_payments;
    v_borrow.rate := p_annual_rate / 100;
  elseif p_period = 2 then
    v_calculated_interest_1 := (p_requested_amount * p_annual_rate / 100);
    v_calculated_interest_2 := ((p_requested_amount / 2) * p_annual_rate / 100);
    v_borrow.number_payments := case 
      when p_is_fortnightly then 48
      else 24
    end;

    v_borrow.total_due := p_requested_amount + v_calculated_interest_1 + v_calculated_interest_2;
    v_borrow.interests := calculated_interest_1 + v_calculated_interest_2; 
    v_borrow.payment := v_borrow.total_due / v_borrow.number_payments;
    v_borrow.rate := p_annual_rate / 100;
  elseif p_period = 3 then
    v_calculated_interest_1 := (p_requested_amount * p_annual_rate / 100);
    v_calculated_due_2 := p_requested_amount - (p_requested_amount / 3);
    v_calculated_interest_2 := (v_calculated_due_2 * p_annual_rate / 100);
    v_calculated_interest_3 := ((v_calculated_due_2 - (p_requested_amount / 3)) * p_annual_rate / 100);
    v_borrow.number_payments := case 
      when is_fortnightly then 72
      else 36
    end;

    v_borrow.total_due := requested_amount + v_calculated_interest_1 + v_calculated_interest_2 + v_calculated_interest_3;
    v_borrow.interests := v_calculated_interest_1 + v_calculated_interest_2 + v_calculated_interest_3; 
    v_borrow.payment := v_borrow.total_due / v_borrow.number_payments;
    v_borrow.rate := p_annual_rate / 100;
  end if;

  return v_borrow;
end;
$$ language plpgsql;