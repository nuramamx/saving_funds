--drop function process.withdrawal_create_by_associate_name;
create or replace function process.withdrawal_create_by_associate_name(
  in p_associate_name text,
  in p_amount numeric,
  in p_applied_at timestamp with time zone,
  in p_is_yields boolean default false,
  in p_is_leave boolean default false,
  in p_is_decease boolean default false,
  in p_disable_rules boolean default false,
  in p_validation_only boolean default false,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_saving_fund_id integer;
  v_amount_to_withhold numeric(20,2);
  v_available_balance numeric(20,2);
  v_amount_available_to_withdrawal numeric(20,2);
begin
  success := false;
  message := 'Operación no iniciada.';

  if length(p_associate_name) <= 0 then
    message := 'El nombre del socio no puede estar vacío.';
    return;
  end if;

  if p_amount <= 0 then
    message := 'El monto del retiro debe ser mayor a cero.';
    return;
  end if;

  v_saving_fund_id := (
    select
      s.id
    from process.saving_fund as s
    join catalog.associate as a on s.associate_id = a.id
    where a.name = trim(upper(p_associate_name))
    limit 1
  );

  if v_saving_fund_id is null then
    message := 'Fondo de ahorro no pudo ser localizado con el nombre del socio especificado: ' || p_associate_name;
    return;
  end if;

  if p_disable_rules = false then
    -- Get the yields (all years passed).
    select
      r.amount_available_to_withdrawal
      ,r.amount_to_withhold
    from process.statement_report_data(v_saving_fund_id) as r
    limit 1
    into
      v_amount_available_to_withdrawal
      ,v_amount_to_withhold;

    -- Subtract withdrawals and amount to withhold from current balance.
    v_available_balance := v_amount_available_to_withdrawal;

    -- Check if associate can withdrawal
    if v_amount_available_to_withdrawal < 0 then
      v_available_balance := 0;
    end if;

    -- Check if withdrawal amount is not greater than balance + yields.
    if p_amount > v_amount_available_to_withdrawal then

      message := 'El monto del retiro es superior al balance actual con rendimientos ' ||
                 '($' || v_amount_available_to_withdrawal::numeric(20,2) || ') del fondo de ahorro. ' ||
                 'Considere los $' || v_amount_to_withhold::numeric(20,2) || ' que son retenidos.';
      return;
    end if;
  end if;

  begin
    if p_validation_only = false then
      insert into process.withdrawal(saving_fund_id, amount, applied_at, is_yields, is_decease, is_leave)
      values (
        v_saving_fund_id
        ,p_amount
        ,p_applied_at
        ,p_is_yields
        ,p_is_decease
        ,p_is_leave
      )
      returning id into inserted_id;
    end if;

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la operación: ' || sqlerrm;
  end;
end;
$$ language plpgsql;
