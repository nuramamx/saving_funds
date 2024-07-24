declare
  v_borrow_id integer;
  v_associate_id integer;
  start_at timestamp;
  requested_amount numeric(20,6);
  "period" integer;
  annual_rate numeric(20,6);
  number_payments integer;
  is_fortnightly boolean;
begin
  drop table if exists payment_schedule;
  create temporary table payment_schedule (
    id integer,
    borrow_id integer,
    associate_id integer,
    "date" timestamp,
    "year" integer,
    "month" integer,
    "number" integer,
    payment_amount numeric(20,6),
    paid_amount numeric(20,6),
    balance numeric(20,6),
    status text,
    resolution text,
    applied_at timestamp,
    created_at timestamp
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
    ,requested_amount
    ,"period"
    ,annual_rate
    ,start_at
    ,number_payments
    ,is_fortnightly
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
  from process.generate_payment_schedule(start_at, number_payments, is_fortnightly) as ps;

  -- If payments are clear set to 0 and set associate id
  update payment_schedule
  set
    borrow_id = v_borrow_id
    ,associate_id = v_associate_id
    ,paid_amount = 0::numeric(20,6)
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
  join process.borrow as b on b.id = p_borrow_id
  join process.borrow_detail as bd on bd.borrow_id = b.id
  where p.borrow_id = p_borrow_id
  and payment_schedule."year" = extract(year from p.applied_at)::integer
  and payment_schedule."month" = extract(month from p.applied_at)::integer
  and payment_schedule."number" = p.payment_number;

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
      else 'SIN IDENTIFICAR'
    end
    ,resolution = case
      when current_date < payment_schedule."date" and payment_schedule.paid_amount = 0 then 'La fecha de pago no se ha alcanzado.'
      when current_date > payment_schedule."date" and payment_schedule.paid_amount = 0 then 'No se realizó el pago en la fecha estipulada.'
      else 'Sin resolución'
    end;

  update payment_schedule
  set 
    balance = (
    select q.balance
    from process.quote_borrow(requested_amount, annual_rate, "period", is_fortnightly) as q
    where q.payment_number = payment_schedule."number"
  );
  
  select
    ps.id
    ,ps.borrow_id
    ,ps.associate_id
    ,to_char(ps."date", 'YYYY-MM-dd') as "date"
    ,ps."year"
    ,ps."month"
    ,ps."number"
    ,ps.payment_amount
    ,ps.paid_amount
    ,ps.balance
    ,ps.status
    ,ps.resolution
    ,to_char(ps.applied_at, 'YYYY-MM-dd HH:mm:ss') as applied_at
    ,to_char(ps.created_at, 'YYYY-MM-dd HH:mm:ss') as created_at
  from payment_schedule ps;
end;
$$ language plpgsql;