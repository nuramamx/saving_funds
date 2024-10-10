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
  create temporary table borrow_debtor_list_temp (
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
    created_at text
  ) on commit drop;

  insert into borrow_debtor_list_temp
  select
    filtered.id
    ,filtered.file_number
    ,filtered.associate_id
    ,filtered.associate_name
    ,filtered.requested_amount
    ,filtered.total_due
    ,0.00 as total_paid
    ,filtered.number_payments
    ,0.00 as payments_made
    ,filtered.is_fortnightly
    ,filtered.start_at
    ,filtered.created_at
  from (
    select
      b.id
      ,b.file_number
      ,b.associate_id
      ,a."name"::text as associate_name
      ,b.requested_amount
      ,bd.total_due
      ,bd.number_payments::integer as number_payments
      ,b.is_fortnightly
      ,to_char(b.start_at at time zone 'utc', 'YYYY-MM-dd') as start_at
      ,to_char(b.created_at at time zone 'utc', 'YYYY-MM-dd') as created_at
    from process.borrow as b
    join process.borrow_detail as bd on b.id = bd.borrow_id
    join "catalog".associate as a on b.associate_id = a.id
    group by
      b.id
      ,b.file_number
      ,b.associate_id
      ,a."name"
      ,b.requested_amount
      ,bd.total_due
      ,bd.number_payments
      ,b.is_fortnightly
      ,b.start_at
      ,b.created_at
  ) as filtered;

  update borrow_debtor_list_temp
    set total_paid = data_update.total_paid
      ,payments_made = data_update.payments_made
  from (
    select
      p.borrow_id
      ,coalesce(sum(p.paid_amount), 0)::numeric(20,6) as total_paid
      ,coalesce(count(p.id),0)::integer as payments_made
    from process.payment as p
    group by
      p.borrow_id
  ) as data_update
  where data_update.borrow_id = borrow_debtor_list_temp.id;

  return query
  select
    report.*
    ,count(1) over() as total_rows
  from borrow_debtor_list_temp report
  where report.total_due > report.total_paid
  and report.number_payments > report.payments_made
  order by report.start_at desc
  limit p_limit offset p_offset;
end;
$$ language plpgsql;