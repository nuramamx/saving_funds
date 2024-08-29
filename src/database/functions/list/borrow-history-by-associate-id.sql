--drop function process.borrow_history_by_associate_id;
create or replace function process.borrow_history_by_associate_id(
  in p_associate_id integer
)
returns table (
  id integer,
  requested_amount numeric(20,6),
  total_due numeric(20,6),
  total_paid numeric(20,6),
  number_payments smallint,
  payments_made smallint,
  "period" smallint,
  is_fortnightly boolean,
  start_at text,
  created_at text,
  resolution text
) as $$
declare
begin
  create temporary table borrow_history_temp (
    id integer,
    requested_amount numeric(20,6),
    total_due numeric(20,6),
    total_paid numeric(20,6),
    number_payments smallint,
    payments_made smallint,
    "period" smallint,
    is_fortnightly boolean,
    start_at text,
    created_at text,
    resolution text
  ) on commit drop;

  insert into borrow_history_temp
  select
    b.id
    ,b.requested_amount 
    ,bd.total_due 
    ,coalesce(sum(p.paid_amount),0) as total_paid
    ,bd.number_payments
    ,coalesce(sum(p.id),0) as payments_made
    ,b."period"
    ,b.is_fortnightly 
    ,to_char(b.start_at, 'YYYY-MM-dd') as start_at 
    ,to_char(b.created_at, 'YYYY-MM-dd') as created_at 
    ,'SIN IDENTIFICAR' as resolution
  from process.borrow as b 
  join process.borrow_detail as bd on b.id = bd.borrow_id
  left join process.payment as p on b.id = p.borrow_id
  where 1=1
  and b.associate_id = p_associate_id
  group by b.id
    ,b.requested_amount 
    ,bd.total_due 
    ,bd.number_payments 
    ,b."period" 
    ,b.is_fortnightly
  order by b.id,
    b.created_at desc;

  return query
  select * from borrow_history_temp;
end;
$$ language plpgsql;