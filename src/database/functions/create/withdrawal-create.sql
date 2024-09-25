--drop function process.withdrawal_create;
create or replace function process.withdrawal_create(
  in p_saving_fund_id integer,
  in p_amount numeric,
  in p_is_yields boolean default false,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_associate_agreement text;
  v_first_contribution_amount numeric(20,2);
  v_amount_to_withhold numeric(20,2);
  v_available_balance numeric(20,2);
  v_withdrawal_sum_amount numeric(20,2);
  v_available_interest_balance numeric(20,2);
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_amount <= 0 then
    message := 'El monto del retiro debe ser mayor a cero.';
    return;
  end if;

  -- Get the yields (all years passed).
  v_available_interest_balance := (select * from process.contribution_get_accrued_yields(p_saving_fund_id));

  if p_is_yields and p_amount > v_available_interest_balance then
    message := 'El monto de retiro de rendimientos excede de los disponibles.';
    return;
  end if;

  -- Get associate agreement.
  select
    ag."name"::text
  into v_associate_agreement
  from catalog.associate as a
  join "system".agreement as ag
    on (a.detail->>'agreementId')::integer = ag.id
  limit 1;

  -- Get the first contribution.
  select
    coalesce(c.amount, 0)
  into v_first_contribution_amount
  from process.contribution as c
  order by c.applied_at desc
  limit 1;

  -- Amount to withhold.
  if (v_associate_agreement = 'ISS') then
    v_amount_to_withhold := v_first_contribution_amount * 300;
  else
    v_amount_to_withhold := v_first_contribution_amount * 150;
  end if;

  -- Get the current balance from contributions.
  select
    sum(coalesce(c.amount, 0))
  into v_available_balance
  from process.contribution as c
  where c.saving_fund_id = p_saving_fund_id;

  -- Get all withdrawals registered.
  select
    sum(coalesce(w.amount, 0))
  into v_withdrawal_sum_amount
  from process.withdrawal as w
  where w.saving_fund_id = p_saving_fund_id
  and w.is_yields = false;

  -- Subtract withdrawals and amount to withhold from current balance.
  v_available_balance := v_available_balance - v_withdrawal_sum_amount - v_amount_to_withhold;

  if v_available_balance < 0 then
    v_available_balance := 0;
  end if;

  -- Check if withdrawal amount is not greater than balance (without consider yields).
  if p_amount > v_available_balance and p_is_yields = false then
    message := 'El monto del retiro es superior al balance actual ($' || v_available_balance::numeric(20,2) || ') ' ||
               'del fondo de ahorro. Considere los $' || v_amount_to_withhold::numeric(20,2) || ' que son retenidos.';
    return;
  end if;

  -- Check if withdrawal amount is not greater than balance + yields.
  if p_amount > v_available_balance then
    message := 'El monto del retiro es superior al balance actual con rendimientos ' ||
               '($' || v_available_balance::numeric(20,2) || ') del fondo de ahorro. ' ||
               'Considere los $' || v_amount_to_withhold::numeric(20,2) || ' que son retenidos.';
    return;
  end if;  

  begin
    insert into process.withdrawal(saving_fund_id, amount, is_yields)
    values (
      p_saving_fund_id
      ,p_amount
      ,p_is_yields
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
