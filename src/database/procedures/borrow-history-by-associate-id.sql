--drop function borrow_history_by_associate_id;
create or replace function borrow_history_by_associate_id(
  in p_associate_id integer
)
returns table (
  id integer,
  associate_id integer,
  associate_name text,
  requested_amount numeric(20,6),
  total_due numeric(20,6),
  total_paid numeric(20,6),
  number_payments smallint,
  payments_made smallint,
  "period" smallint,
  is_fortnightly boolean,
  status boolean
) as $$
declare
begin
  create temporary table borrow_history_temp (
    id integer,
    associate_id integer,
    associate_name text,
    requested_amount numeric(20,6),
    total_due numeric(20,6),
    total_paid numeric(20,6),
    number_payments smallint,
    payments_made smallint,
    "period" smallint,
    is_fortnightly boolean,
    status boolean
  ) on commit drop;


  insert into borrow_history_temp
  select b.id
    ,b.associate_id
    ,deconstruct_name(a."name") as associate_name
    ,b.requested_amount 
    ,bd.total_due 
    ,coalesce(sum(p.amount_paid),0) as total_paid
    ,bd.number_payments
    ,coalesce(sum(p.id),0) as payments_made
    ,b."period"
    ,b.is_fortnightly 
    ,'SIN IDENTIFICAR' as status
  from process.borrow as b 
  join process.borrow_detail as bd on b.id = bd.borrow_id
  join "catalog".associate as a on b.associate_id = a.id
  left join process.payment as p on b.id = p.borrow_id
  where 1=1
  and b.associate_id = p_associate_id
  group by b.id
    ,a.id 
    ,a."name" 
    ,b.requested_amount 
    ,bd.total_due 
    ,bd.number_payments 
    ,b."period" 
    ,b.is_fortnightly;

  return query
  select * from borrow_history_temp;
end;
$$ language plpgsql;