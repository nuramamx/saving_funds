--drop function process.borrow_list_by_associate_id;
create or replace function process.borrow_list_by_associate_id(
  in p_associate_id integer
)
returns table (
  id integer,
  file_number text,
  requested_amount numeric(20,6),
  total_due numeric(20,6),
  total_paid numeric(20,6),
  number_payments integer,
  payments_made integer,
  "period" integer,
  is_fortnightly boolean,
  start_at text,
  created_at text,
  resolution text
) as $$
declare
begin
  create temporary table borrow_history_temp (
    id integer,
    file_number text,
    requested_amount numeric(20,6),
    total_due numeric(20,6),
    total_paid numeric(20,6),
    number_payments integer,
    payments_made integer,
    "period" integer,
    is_fortnightly boolean,
    start_at text,
    created_at text,
    resolution text
  ) on commit drop;

  insert into borrow_history_temp
  select
    b.id
    ,b.file_number
    ,b.requested_amount
    ,bd.total_due
    ,payments.total_paid
    ,bd.number_payments
    ,payments.payments_made
    ,b."period"
    ,b.is_fortnightly
    ,to_char(b.start_at at time zone 'utc', 'YYYY-MM-dd') as start_at
    ,to_char(b.created_at at time zone 'utc', 'YYYY-MM-dd') as created_at
    ,case
      when (payments.total_paid >= bd.total_due) then 'LIQUIDADO'
      when (payments.payments_made >= bd.number_payments) then 'LIQUIDADO'
      else 'NO LIQUIDADO' end
      as resolution
  from process.borrow as b
  join process.borrow_detail as bd on b.id = bd.borrow_id
  left join lateral (
    select
      sum(p.paid_amount)::numeric(20,6) as total_paid
      ,coalesce(count(p.id),0)::integer as payments_made
    from process.payment as p
    where p.borrow_id = b.id
  ) payments on true
  where b.associate_id = p_associate_id
  group by b.id
    ,b.file_number
    ,b.requested_amount
    ,bd.total_due
    ,payments.total_paid
    ,bd.number_payments
    ,payments.payments_made
    ,b."period"
    ,b.is_fortnightly
    ,b.created_at
  order by b.id,
    b.created_at desc;

  return query
  select * from borrow_history_temp;
end;
$$ language plpgsql;