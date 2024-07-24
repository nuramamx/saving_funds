--drop function process.borrow_create;
create or replace function process.borrow_create(
  in associate_id integer,
  in requested_amount numeric,
  in period integer,
  in is_fortnightly boolean,
  in start_at timestamp,
  out inserted_id integer,
  out success boolean,
  out message text
)
as $$
declare
  annual_rate numeric(20,6);
  borrow process.borrow_type;
begin
  inserted_id := null;
  success := false;
  message := 'Operación no iniciada.';

  if associate_id = 0 then
    message := 'El socio ligado al préstamo no es válido.';
    return;
  elseif requested_amount <= 0 then
    message := 'El monto solicitado no puede ser de 0.';
    return;
  elseif period not in (1,2,3) then
    message := 'El periodo no está en el rango requerido (1, 2, 3).';
    return;
  elseif start_at < current_date then
    message := 'La fecha de inicio no puede ser antes del día de la fecha de inscripción del préstamo.';
    return;
  elseif start_at > (current_date + interval '30 days') then
    message := 'La fecha de inicio no puede ser mayor a 30 días a partir de la fecha de inscripción del préstamo.';
    return;
  end if;

  -- Check if associate has a not settled borrow.
--  if exists (
--    select 1 from process.borrow B
--    where B.associate_id = borrow_create.associate_id
--    and B.is_settled = false
--    for update skip locked
--  ) then
--    message := 'El socio tiene un préstamo no liquidado.';
--    return;
--  end if;

  -- Get the annual rate based on period.
  select AR.rate into annual_rate
  from administration.annual_rate AR
  where AR.period = borrow_create.period;

  begin
    insert into process.borrow (associate_id, requested_amount, period, annual_rate, is_fortnightly, start_at)
    values (
      borrow_create.associate_id,
      requested_amount,
      borrow_create.period,
      annual_rate,
      is_fortnightly,
      start_at
    )
    returning id into inserted_id;

    -- Get borrow calculations
    borrow := process.calculate_borrow(requested_amount, annual_rate, period, is_fortnightly);

    -- Create detail
    insert into process.borrow_detail (
      borrow_id
      ,number_payments
      ,interests
      ,total_due
      ,guarantee_fund
      ,payment
      ,amount_delivered
    ) values (
      inserted_id
      ,borrow.number_payments
      ,borrow.interests
      ,borrow.total_due
      ,borrow.guarantee_fund
      ,borrow.payment
      ,requested_amount
    );

    success := true;
    message := 'El préstamo se ha registrado con éxito.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la operación: ' || SQLERRM;
  end;
end;
$$ language plpgsql;