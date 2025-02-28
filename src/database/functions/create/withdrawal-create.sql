--drop function process.withdrawal_create;
create or replace function process.withdrawal_create(
  in p_saving_fund_id integer,
  in p_amount numeric,
  in p_applied_at timestamp with time zone,
  in p_is_yields boolean default false,
  in p_is_leave boolean default false,
  in p_is_decease boolean default false,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_associate_id integer;
  v_amount_to_withhold numeric(20,2);
  v_available_balance numeric(20,2);
  v_amount_available_to_withdrawal numeric(20,2);
  v_total_available numeric(20,2);
begin
  success := false;
  message := 'Operación no iniciada.';

  select
    s.associate_id
  into v_associate_id
  from process.saving_fund as s
  where s.id = p_saving_fund_id
  limit 1;

  if v_associate_id is null then
    message := 'Socio no pudo ser localizado con el id de fondo de ahorro: ' || p_saving_fund_id;
    return;
  end if;

  if p_is_leave = true or p_is_decease = true then
    select
      r.net_total
    into v_total_available
    from process.statement_report_list(v_associate_id) as r
    order by year desc
    limit 1;
  else
    if p_amount <= 0 then
      message := 'El monto del retiro debe ser mayor a cero.';
      return;
    end if;

    -- Get the yields (all years passed).
    select
      r.amount_available_to_withdrawal
      ,r.amount_to_withhold
    from process.statement_report_data(v_associate_id) as r
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

    v_total_available := p_amount;
  end if;

  begin
    insert into process.withdrawal(saving_fund_id, amount, is_yields, applied_at, is_leave, is_decease)
    values (
      p_saving_fund_id
      ,v_total_available
      ,p_is_yields
      ,p_applied_at
      ,p_is_leave
      ,p_is_decease
    )
    returning id into inserted_id;

    if p_is_leave = true or p_is_decease = true then
      update catalog.associate
        set is_active = false
      where catalog.associate.id = v_associate_id;
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
