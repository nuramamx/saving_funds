--drop function process.borrow_debtor_list;
create or replace function process.borrow_debtor_list()
returns table (
  id integer,
  associate_id integer,
  associate_name text,
  requested_amount numeric(20,6),
  total_due numeric(20,6),
  total_paid numeric(20,6),
  number_payments smallint,
  payments_made smallint,
  is_fortnightly boolean,
  start_at text,
  created_at text
) as $$
declare
  v_borrow_id integer;
  v_requested_amount numeric(20,6);
  v_total_due numeric(20,6);
  v_total_paid numeric(20,6);
  v_number_payments integer;
  v_payments_made integer;
  v_is_fortnightly boolean;
  v_start_at text;
begin
  create temporary table temp_delayed_payments (
    borrow_id integer
  ) on commit drop;

  for v_borrow_id in
    select b.id from process.borrow as b
  loop
    insert into temp_delayed_payments
    select
      pl.borrow_id
    from process.payment_list_by_borrow_id(v_borrow_id) as pl
    where pl.status = 'ATRASADO'
    group by
      pl.borrow_id;
  end loop;
    
  return query
  select
    b.id
    ,b.associate_id 
    ,deconstruct_name(a.name) as associate_name 
    ,b.requested_amount 
    ,bd.total_due 
    ,(coalesce(sum(p.paid_amount), 0.00))::numeric(20,6) as total_paid
    ,bd.number_payments 
    ,coalesce(sum(p.id),0)::smallint as payments_made
    ,b.is_fortnightly 
    ,to_char(b.start_at, 'YYYY-MM-dd') as start_at 
    ,to_char(b.created_at, 'YYYY-MM-dd') as created_at 
  from process.borrow as b 
  join process.borrow_detail as bd on b.id = bd.borrow_id 
  join "catalog".associate as a on b.associate_id = a.id 
  left join process.payment as p on b.id = p.borrow_id 
  where b.id in (select tdb.borrow_id from temp_delayed_payments as tdb)
  group by
    b.id
    ,b.associate_id
    ,a.name
    ,b.requested_amount 
    ,bd.total_due
    ,bd.number_payments 
    ,b.is_fortnightly 
    ,b.start_at
    ,b.created_at;
end;
$$ language plpgsql;