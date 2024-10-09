--drop function process.borrow_due_allowed_difference;
create or replace function process.borrow_due_allowed_difference(
  in p_borrow_id integer,
  in p_allowed_difference numeric(20,6)
)
returns boolean as $$
declare
  v_total_due numeric(20,6);
  v_total_paid numeric(20,6);
begin
  v_total_due := (
    select
      bd.total_due
    from process.borrow_detail as bd
    where bd.borrow_id = p_borrow_id
  );

  v_total_paid := (
    select
      sum(p.paid_amount)
    from process.payment as p
    where p.borrow_id = p_borrow_id
  );

  raise notice '%', (v_total_due - v_total_paid);

  if (v_total_paid > v_total_due) then
    return true;
  else
    return ((v_total_due - v_total_paid) < p_allowed_difference);
  end if;
end;
$$ language plpgsql;
