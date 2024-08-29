drop view if exists process.list_debtor_associate;
create or replace view process.list_debtor_associate as
  with debtors as (
    select
      a.id as associate_id
      ,b.id as borrow_id
      ,deconstruct_name(a."name") as associate_name
    from "catalog".associate as a
    join process.borrow as b on a.id = b.associate_id
    where b.is_settled = false
    and validate_borrow_debtor(a.id)
  ),
  payments_by_month as (
    select *
    from process.payment as p
    join process.borrow as b on p.borrow_id = b.id 
    group by
  );
  