--drop function process.payment_list_by_borrow_id;
create or replace function process.payment_list_by_borrow_id(
  in borrow_id integer
)
returns table (
  id integer,
  "date" text,
  "year" integer,
  "month" integer,
  "number" integer,
  payment_amount numeric(20,6),
  paid_amount numeric(20,6),
  status text,
  resolution text,
  applied_at text,
  created_at text
  
) as $$
declare
  start_at timestamp;
  number_payments integer;
  is_fortnightly boolean;
begin
  create temporary table payment_schedule (
    id integer,
    "date" timestamp,
    "year" integer,
    "month" integer,
    "number" integer,
    payment_amount numeric(20,6),
    paid_amount numeric(20,6),
    status text,
    resolution text,
    applied_at timestamp,
    created_at timestamp
  ) on commit drop;

  select b.start_at, bd.number_payments, b.is_fortnightly
  into start_at, number_payments, is_fortnightly
  from process.borrow as b
  join process.borrow_detail as bd on b.id = bd.borrow_id;

  -- Create the schedule to make a relation with payments
  insert into payment_schedule ("date", "year", "month", "number")
  select 
    ps."date"
    ,ps."year"
    ,ps."month"
    ,ps."number"
  from process.generate_payment_schedule(start_at, number_payments, is_fortnightly) as ps;

  -- If payments are clear set to 0
  update payment_schedule
  set
    paid_amount = 0::numeric(20,6)
  where payment_schedule.paid_amount is null;

  -- Update id and paid amount by borrow related to payment
  update payment_schedule
  set
    id = p.id
    ,paid_amount = p.paid_amount 
    ,applied_at = p.applied_at 
    ,created_at = p.created_at 
    ,status = case
      when p.paid_amount = bd.payment then 'PAGADO'
      else 'INCIDENCIA'
    end
    ,resolution = case
      when p.paid_amount < bd.payment then 'El pago fue registrado con un monto menor.'
      when p.paid_amount > bd.payment then 'El pago fue registrado con un monto mayor.'
      else 'Sin resolución'
    end
  from process.payment as p
  join process.borrow_detail as bd on bd.borrow_id = payment_list_by_borrow_id.borrow_id
  where p.borrow_id = payment_list_by_borrow_id.borrow_id
  and payment_schedule."year" = extract(year from p.applied_at)::integer
  and payment_schedule."month" = extract(month from p.applied_at)::integer
  and payment_schedule."number" = p.payment_number;

  -- Set payment amount
  update payment_schedule
  set
    payment_amount = bd.payment
  from process.borrow_detail as bd
  where bd.borrow_id = payment_list_by_borrow_id.borrow_id;

  -- Looking for delayed payments or in good standing
  update payment_schedule
  set
    status = case
      when current_date < payment_schedule."date" and payment_schedule.paid_amount = 0 then 'PENDIENTE'
      when current_date > payment_schedule."date" and payment_schedule.paid_amount = 0 then 'ATRASADO'
      else 'SIN IDENTIFICAR'
    end
    ,resolution = case
      when current_date < payment_schedule."date" and payment_schedule.paid_amount = 0 then 'La fecha de pago no se ha alcanzado.'
      when current_date > payment_schedule."date" and payment_schedule.paid_amount = 0 then 'El pago cuenta con un atraso.'
      else 'Sin resolución'
    end;

  return query
  select
    ps.id
    ,to_char(ps."date", 'YYYY-MM-dd') as "date"
    ,ps."year"
    ,ps."month"
    ,ps."number"
    ,ps.payment_amount
    ,ps.paid_amount
    ,ps.status
    ,ps.resolution
    ,to_char(ps.applied_at, 'YYYY-MM-dd HH:mm:ss') as applied_at
    ,to_char(ps.created_at, 'YYYY-MM-dd HH:mm:ss') as created_at
  from payment_schedule ps;
end;
$$ language plpgsql;
