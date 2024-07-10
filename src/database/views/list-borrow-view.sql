drop view if exists process.list_borrow_view;
create or replace view process.list_borrow_view as
  select b.id
    ,a.id as associate_id
    ,deconstruct_name(a."name") as associate_name
    ,b.requested_amount
    ,bd.total_due
    ,coalesce(sum(p.amount_paid), 0) as total_paid
    ,b."period"
    ,b.is_fortnightly
  from process.borrow as b
  join process.borrow_detail as bd on b.id = bd.id
  join "catalog".associate as a on b.associate_id = a.id
  left join process.payment as p on b.id = p.borrow_id
  where b.is_settled = false
  group by b.id
    ,a.id
    ,a."name" 
    ,b.requested_amount 
    ,bd.total_due 
    ,b."period"
    ,b.is_fortnightly
  order by b.id, b.created_at desc