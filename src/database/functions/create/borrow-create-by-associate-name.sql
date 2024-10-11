--drop function process.borrow_create_by_associate_name;
create or replace function process.borrow_create_by_associate_name(
  in p_file_number text,
  in p_associate_name text,
  in p_requested_amount numeric,
  in p_period integer,
  in p_annual_rate numeric,
  in p_start_at timestamp with time zone,
  in p_is_fortnightly boolean default false,
  in p_disable_rules boolean default false,
  in p_validation_only boolean default false,
  out inserted_id integer,
  out success boolean,
  out message text
)
as $$
declare
  v_associate_id integer;
  v_annual_rate numeric(20,6);
  v_borrow process.borrow_type;
begin
  success := false;
  message := 'Operación no iniciada.';

  if length(p_file_number) <= 0 then
    message := 'El folio no puede estar vacío.';
    return;
  elseif length(p_associate_name) <= 0 then
    message := 'El nombre del socio no puede estar vacío.';
    return;
  elseif p_requested_amount <= 0 then
    message := 'El monto solicitado no puede ser de 0.';
    return;
  elseif p_period not in (1,2,3) then
    message := 'El periodo no está en el rango requerido (1, 2, 3).';
    return;
  end if;

  v_associate_id := (
    select
      a.id
    from catalog.associate as a
    where a.name = trim(upper(p_associate_name))
    limit 1
  );

  if v_associate_id is null then
    message := 'Socio no pudo ser localizado con el nombre especificado.';
    return;
  end if;

  if p_disable_rules = false then
    -- Check dates
    if p_start_at < current_date then
      message := 'La fecha de inicio no puede ser antes del día de la fecha de inscripción del préstamo.';
      return;
    end if;

    -- Check interval
    if p_start_at > (current_date + interval '30 days') then
      message := 'La fecha de inicio no puede ser mayor a 30 días a partir de la fecha de inscripción del préstamo.';
      return;
    end if;

    -- Check if associate has a not settled borrow.
    if exists (
      select 1
      from process.borrow as b
      where b.name = p_associate_name
      for update skip locked
    ) then
      message := 'El socio tiene un préstamo no liquidado.';
      return;
    end if;
  end if;

  begin
    if p_validation_only = false then
      insert into process.borrow(associate_id, file_number, requested_amount, "period", annual_rate, is_fortnightly, start_at)
      values (
        v_associate_id,
        p_file_number,
        p_requested_amount,
        p_period,
        p_annual_rate,
        p_is_fortnightly,
        p_start_at
      )
      returning id into inserted_id;

      -- Get borrow calculations
      v_borrow := process.borrow_calculate(p_requested_amount, p_annual_rate, p_period, p_is_fortnightly);

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
    end if;

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la transacción: ' || sqlerrm;
  end;
end;
$$ language plpgsql;