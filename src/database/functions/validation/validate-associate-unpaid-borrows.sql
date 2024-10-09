--drop function process.validate_associate_unpaid_borrows;
create or replace function process.validate_associate_unpaid_borrows(
  in p_associate_id integer
)
returns boolean as $$
begin
  if exists(
    select
      1
    from process.borrow as b
    where b.associate_id = p_associate_id
    and process.validate_borrow_is_settled(b.id) = false
  ) then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;