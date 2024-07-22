--drop function process.calculate_borrow;
create or replace function process.calculate_borrow(
  requested_amount numeric(20,6),
  annual_rate numeric(20,6),
  period integer,
  is_fortnightly boolean
)
returns process.borrow_type as $$
declare
  borrow process.borrow_type;
  calculated_due_2 numeric(20,6);
  calculated_interest_1 numeric(20,6);
  calculated_interest_2 numeric(20,6);
  calculated_interest_3 numeric(20,6);
begin
  borrow.guarantee_fund := (requested_amount * 2) / 100;
  
  if "period" = 1 then
    calculated_interest_1 := (requested_amount * annual_rate / 100);
    borrow.number_payments := case 
      when is_fortnightly then 24
      else 12
    end;
    borrow.total_due := requested_amount + calculated_interest_1;
    borrow.interests := calculated_interest_1; 
    borrow.payment := borrow.total_due / borrow.number_payments;
    borrow.rate := annual_rate / 100;
  elseif "period" = 2 then
    calculated_interest_1 := (requested_amount * annual_rate / 100);
    calculated_interest_2 := ((requested_amount / 2) * annual_rate / 100);
    borrow.number_payments := case 
      when is_fortnightly then 48
      else 24
    end;
    borrow.total_due := requested_amount + calculated_interest_1 + calculated_interest_2;
    borrow.interests := calculated_interest_1 + calculated_interest_2; 
    borrow.payment := borrow.total_due / borrow.number_payments;
    borrow.rate := annual_rate / 100;
  elseif "period" = 3 then
    calculated_interest_1 := (requested_amount * annual_rate / 100);
    calculated_due_2 := requested_amount - (requested_amount / 3);
    calculated_interest_2 := (calculated_due_2 * annual_rate / 100);
    calculated_interest_3 := ((calculated_due_2 - (requested_amount / 3)) * annual_rate / 100);
    borrow.number_payments := case 
      when is_fortnightly then 72
      else 36
    end;
    borrow.total_due := requested_amount + calculated_interest_1 + calculated_interest_2 + calculated_interest_3;
    borrow.interests := calculated_interest_1 + calculated_interest_2 + calculated_interest_3; 
    borrow.payment := borrow.total_due / borrow.number_payments;
    borrow.rate := annual_rate / 100;
  end if;

  return borrow;
end;
$$ language plpgsql;