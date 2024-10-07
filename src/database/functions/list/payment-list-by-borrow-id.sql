--drop function process.payment_list_by_borrow_id;
create or replace function process.payment_list_by_borrow_id(
  in p_borrow_id integer
)
returns table (
  id integer,
  borrow_id integer,
  associate_id integer,
  "date" text,
  "year" integer,
  "month" integer,
  "number" integer,
  payment_amount numeric(20,6),
  paid_amount numeric(20,6),
  balance numeric(20,6),
  status text,
  resolution text,
  applied_at text,
  created_at text
) as $$
declare
  v_borrow_id integer;
  v_associate_id integer;
  v_start_at timestamp with time zone;
  v_requested_amount numeric(20,6);
  v_period integer;
  v_annual_rate numeric(20,6);
  v_number_payments integer;
  v_is_fortnightly boolean;
begin
  drop table if exists payment_schedule;
  create temporary table payment_schedule (
    id integer,
    borrow_id integer,
    associate_id integer,
    "date" timestamp with time zone,
    "year" integer,
    "month" integer,
    "number" integer,
    payment_amount numeric(20,2),
    paid_amount numeric(20,2),
    balance numeric(20,2),
    status text,
    resolution text,
    applied_at timestamp with time zone,
    created_at timestamp with time zone 
  ) on commit drop;

  select
    b.id
    ,b.associate_id 
    ,b.requested_amount
    ,b."period" 
    ,b.annual_rate
    ,b.start_at
    ,bd.number_payments
    ,b.is_fortnightly
  into
    v_borrow_id
    ,v_associate_id
    ,v_requested_amount
    ,v_period
    ,v_annual_rate
    ,v_start_at
    ,v_number_payments
    ,v_is_fortnightly
  from process.borrow as b
  join process.borrow_detail as bd on b.id = bd.borrow_id
  where b.id = p_borrow_id;

  -- Create the schedule to make a relation with payments
  insert into payment_schedule ("date", "year", "month", "number")
  select 
    ps."date"
    ,ps."year"
    ,ps."month"
    ,ps."number"
  from process.payment_generate_schedule(v_start_at, v_number_payments, v_is_fortnightly) as ps;

  -- If payments are clear set to 0 and set associate id
  update payment_schedule
  set
    borrow_id = v_borrow_id
    ,associate_id = v_associate_id
    ,paid_amount = 0::numeric(20,2)
  where payment_schedule.paid_amount is null;

  -- Update id and paid amount by borrow related to payment
  update payment_schedule
  set
    id = p.id
    ,paid_amount = p.paid_amount 
    ,applied_at = p.applied_at 
    ,created_at = p.created_at 
    ,status = case
      when p.paid_amount = cast(bd.payment as numeric(20,2)) and p.applied_at > payment_schedule."date" then 'INCIDENCIA'
      when p.paid_amount = cast(bd.payment as numeric(20,2)) then 'PAGADO'
      else 'INCIDENCIA'
    end
    ,resolution = case
      when p.paid_amount < cast(bd.payment as numeric(20,2)) then 'El pago fue registrado con un monto menor.'
      when p.paid_amount > cast(bd.payment as numeric(20,2)) then 'El pago fue registrado con un monto mayor.'
      when p.applied_at > payment_schedule."date" then 'El pago fue registrado en una fecha posterior.'
      when p.applied_at < payment_schedule."date" then 'El pago fue registrado en una fecha aún no alcanzada.'
      else 'Sin resolución'
    end
  from process.payment as p
  join process.borrow as b on b.id = p_borrow_id
  join process.borrow_detail as bd on bd.borrow_id = b.id
  where p.borrow_id = p_borrow_id
  and payment_schedule."number" = p."number";

  -- Set payment amount
  update payment_schedule
  set
    payment_amount = bd.payment
  from process.borrow_detail as bd
  where bd.borrow_id = p_borrow_id;

  -- Looking for delayed payments or in good standing
  update payment_schedule
  set
    status = case
      when current_date < payment_schedule."date" and payment_schedule.paid_amount = 0 then 'PENDIENTE'
      when current_date > payment_schedule."date" and payment_schedule.paid_amount = 0 then 'ATRASADO'
      else payment_schedule.status
    end
    ,resolution = case
      when current_date < payment_schedule."date" and payment_schedule.paid_amount = 0 then 'La fecha de pago no se ha alcanzado.'
      when current_date > payment_schedule."date" and payment_schedule.paid_amount = 0 then 'No se realizó el pago en la fecha estipulada.'
      else payment_schedule.resolution
    end;

  update payment_schedule
  set
    balance = (
    select q.balance
    from process.borrow_quote(v_requested_amount, v_annual_rate, v_period, v_is_fortnightly) as q
    where q.payment_number = payment_schedule."number"
  );
  
  return query
  select
    ps.id
    ,ps.borrow_id
    ,ps.associate_id
    ,to_char(ps."date" at time zone 'utc', 'YYYY-MM-dd') as "date"
    ,ps."year"
    ,ps."month"
    ,ps."number"
    ,ps.payment_amount
    ,ps.paid_amount
    ,ps.balance
    ,ps.status
    ,ps.resolution
    ,to_char(ps.applied_at at time zone 'utc', 'YYYY-MM-dd HH24:MI:SS') as applied_at
    ,to_char(ps.created_at at time zone 'utc', 'YYYY-MM-dd HH24:MI:SS') as created_at
  from payment_schedule ps
  order by
    ps."number";
end;
$$ language plpgsql;
