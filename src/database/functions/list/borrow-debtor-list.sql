--drop function process.borrow_debtor_list;
create or replace function process.borrow_debtor_list(
  p_limit integer = 20,
  p_offset integer = 0
)
returns table (
  id integer,
  file_number text,
  associate_id integer,
  associate_name text,
  requested_amount numeric(20,6),
  total_due numeric(20,6),
  total_paid numeric(20,6),
  number_payments integer,
  payments_made integer,
  is_fortnightly boolean,
  start_at text,
  created_at text,
  total_rows bigint
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
  return query
  select
    b.id
    ,b.file_number
    ,b.associate_id 
    ,a."name"::text as associate_name 
    ,b.requested_amount 
    ,bd.total_due 
    ,payments.total_paid
    ,bd.number_payments::integer as number_payments
    ,payments.payments_made
    ,b.is_fortnightly 
    ,to_char(b.start_at at time zone 'utc', 'YYYY-MM-dd') as start_at
    ,to_char(b.created_at at time zone 'utc', 'YYYY-MM-dd') as created_at
    ,count(1) over () as total_rows
  from process.borrow as b 
  join process.borrow_detail as bd on b.id = bd.borrow_id 
  join "catalog".associate as a on b.associate_id = a.id 
  left join lateral (
    select
      sum(p.paid_amount)::numeric(20,6) as total_paid
      ,coalesce(count(p.id),0)::integer as payments_made
    from process.payment as p
    where p.borrow_id = b.id
  ) payments on true
  where bd.number_payments <> payments.payments_made
  and b.is_settled = false
  group by
    b.id
    ,b.file_number
    ,b.associate_id
    ,a."name"
    ,b.requested_amount 
    ,bd.total_due
    ,payments.total_paid
    ,bd.number_payments
    ,payments.payments_made
    ,b.is_fortnightly 
    ,b.start_at
    ,b.created_at
  order by b.start_at desc
  limit p_limit offset p_offset;
end;
$$ language plpgsql;