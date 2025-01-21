--drop function process.withdrawal_create;
create or replace function process.withdrawal_create(
  in p_saving_fund_id integer,
  in p_amount numeric,
  in p_applied_at timestamp with time zone,
  in p_is_yields boolean default false,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_amount_to_withhold numeric(20,2);
  v_available_balance numeric(20,2);
  v_amount_available_to_withdrawal numeric(20,2);
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_amount <= 0 then
    message := 'El monto del retiro debe ser mayor a cero.';
    return;
  end if;

  -- Get the yields (all years passed).
  select
    r.amount_available_to_withdrawal
    ,r.amount_to_withhold
  from process.statement_report_data(p_saving_fund_id) as r
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

  begin
    insert into process.withdrawal(saving_fund_id, amount, is_yields, applied_at)
    values (
      p_saving_fund_id
      ,p_amount
      ,p_is_yields
      ,p_applied_at
    )
    returning id into inserted_id;

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la operación: ' || sqlerrm;
  end;
end;
$$ language plpgsql;
