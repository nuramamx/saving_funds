--drop function public.validate_available_borrow_amount;
create or replace function public.validate_available_borrow_amount(
  p_associate_id integer,
  p_requested_amount numeric
)
returns boolean as $$
begin
  if exists(
    select 1 from process.saving_fund sf where sf.associate_id = p_associate_id and sf.money_available > p_requested_amount
  ) then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;