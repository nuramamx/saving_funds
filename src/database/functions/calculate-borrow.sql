--drop function process.calculate_borrow;
create or replace function process.calculate_borrow(
  requested_amount numeric(20,6),
  annual_rate numeric(20,6),
  period integer,
  is_fortnightly boolean
)
returns process.borrow_spec as $$
declare
  borrow process.borrow_spec;
  calculated_rate numeric(20,6);
  calculated_period smallint;
  calculated_divisor numeric(20,6);
begin
  -- Calculate borrow detail
  if is_fortnightly then
    calculated_rate := (annual_rate / 24) / 100;
    calculated_period := (period * 24);
  else
    calculated_rate := (annual_rate / 12) / 100;
    calculated_period := (period * 12);
  end if;

  -- Calculate borrow
  calculated_divisor := (1 - (1 + calculated_rate) ^ -calculated_period);
  borrow.rate = calculated_rate;
  borrow.payment := (requested_amount * borrow.rate) / calculated_divisor;
  borrow.interests := (borrow.payment * calculated_period) - requested_amount;
  borrow.total_due := (requested_amount + borrow.interests);
  borrow.guarantee_fund := (requested_amount * 2) / 100;
  borrow.number_payments := calculated_period;

  return borrow;
end;
$$ language plpgsql;