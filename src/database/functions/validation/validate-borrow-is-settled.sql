--drop function process.validate_borrow_is_settled;
create or replace function process.validate_borrow_is_settled(
  in p_borrow_id integer
)
returns boolean as $$
begin
  if exists(
    select
      1
    from process.borrow as b
    join process.borrow_detail as bd on b.id = bd.borrow_id
    left join lateral (
      select
        sum(p.paid_amount)::numeric(20,6) as total_paid
        ,coalesce(count(p.id),0)::integer as payments_made
      from process.payment as p
      where p.borrow_id = b.id
    ) payments on true
    where b.id = p_borrow_id
    and (payments.total_paid >= bd.total_due or payments.payments_made >= bd.number_payments)
  ) then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;