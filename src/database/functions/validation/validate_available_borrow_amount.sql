--drop function validate_available_borrow_amount;
create or replace function validate_available_borrow_amount(associate_id integer, requested_amount numeric)
returns boolean as $$
begin
  if exists(
    select 1 from operation.savingfund sf where sf.associate_id = associate_id and sf.money_available > requested_amount
  ) then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;