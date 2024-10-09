--drop function process.borrow_create;
create or replace function process.borrow_create(
  in p_associate_id integer,
  in p_requested_amount numeric,
  in p_period integer,
  in p_is_fortnightly boolean,
  in p_start_at timestamp,
  out inserted_id integer,
  out success boolean,
  out message text
)
as $$
declare
  v_current_year integer;
  v_file_number text;
  v_annual_rate numeric(20,6);
  v_borrow process.borrow_type;
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_associate_id = 0 then
    message := 'El socio ligado al préstamo no es válido.';
    return;
  elseif p_requested_amount <= 0 then
    message := 'El monto solicitado no puede ser de 0.';
    return;
  elseif p_period not in (1,2,3) then
    message := 'El periodo no está en el rango requerido (1, 2, 3).';
    return;
  elseif p_start_at < current_date then
    message := 'La fecha de inicio no puede ser antes del día de la fecha de inscripción del préstamo.';
    return;
  elseif p_start_at > (current_date + interval '30 days') then
    message := 'La fecha de inicio no puede ser mayor a 30 días a partir de la fecha de inscripción del préstamo.';
    return;
  end if;

  -- Check if associate has a not settled borrow.
  if process.validate_associate_unpaid_borrows(p_associate_id) then
    message := 'El socio tiene un préstamo no liquidado.';
    return;
  end if;

  -- Get the annual rate based on period.
  select
    ar.rate
  into v_annual_rate
  from "system".borrow_annual_rate as ar
  where ar."period" = p_period;

  -- Create file number.
  v_current_year := (select extract(year from current_date)::integer);
  v_file_number := v_current_year || '/' || p_associate_id || '/' || floor(1000 + random() * 9000)::integer || '/' || p_period;

  begin
    insert into process.borrow(associate_id, file_number, requested_amount, "period", annual_rate, is_fortnightly, start_at)
    values (
      p_associate_id,
      v_file_number,
      p_requested_amount,
      p_period,
      v_annual_rate,
      p_is_fortnightly,
      p_start_at
    )
    returning id into inserted_id;

    -- Get borrow calculations
    v_borrow := process.borrow_calculate(p_requested_amount, v_annual_rate, p_period, p_is_fortnightly);

    -- Create detail
    insert into process.borrow_detail(borrow_id,number_payments,interests,total_due,guarantee_fund,payment,amount_delivered)
    values (
      inserted_id
      ,v_borrow.number_payments
      ,v_borrow.interests
      ,v_borrow.total_due
      ,v_borrow.guarantee_fund
      ,v_borrow.payment
      ,p_requested_amount
    );

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la transacción: ' || sqlerrm;
  end;
end;
$$ language plpgsql;