--drop view if exists process.borrow_list_view;
create or replace view process.borrow_list_view as
  select
    b.id
    ,a.id as associate_id
    ,deconstruct_name(a."name") as associate_name
    ,b.requested_amount
    ,bd.total_due
    ,coalesce(sum(p.paid_amount), 0) as total_paid
    ,b."period"
    ,b.is_fortnightly
    ,to_char(b.start_at, 'YYYY-MM-dd') as start_at
    ,to_char(b.created_at, 'YYYY-MM-dd') as created_at
  from process.borrow as b
  join process.borrow_detail as bd on b.id = bd.borrow_id 
  join "catalog".associate as a on b.associate_id = a.id
  left join process.payment as p on b.id = p.borrow_id
  where b.is_settled = false
  group by
    b.id
    ,a.id
    ,a."name" 
    ,b.requested_amount 
    ,bd.total_due 
    ,b."period"
    ,b.is_fortnightly
  order by b.id, b.created_at desc;