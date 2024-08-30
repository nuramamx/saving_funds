--drop function process.withdrawal_create;
create or replace function process.withdrawal_create(
  in p_saving_fund_id integer,
  in p_amount numeric,
  in p_is_interest boolean default false,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_available_balance numeric(20,6);
  v_withdrawal_sum_amount numeric(20,6);
  v_available_interest_balance numeric(20,6);
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_amount <= 0 then
    message := 'El monto del retiro debe ser mayor a cero.';
    return;
  end if;

   v_available_interest_balance := (select * from process.contribution_get_accrued_interest(p_saving_fund_id));

  select
    (sum(coalesce(c.amount, 0)) - sum(coalesce(w.amount, 0))) 
  into
    v_available_balance
  from process.contribution as c
  where c.saving_fund_id = p_saving_fund_id;

  select
    sum(coalesce(w.amount, 0))
  into
    v_withdrawal_sum_amount
  from process.withdrawal as w
  where w.saving_fund_id = p_saving_fund_id;

  v_available_balance := v_available_balance - v_withdrawal_sum_amount;

message := 'El monto del retiro es superior al balance actual con intereses acumulados sss(' || v_available_balance::numeric(20,2) || ') del fondo de ahorro.';
    return;

  if v_available_balance < 0 then
    v_available_balance := 0;
  end if;

  if p_amount > v_available_balance and p_is_interest = false then
    message := 'El monto del retiro es superior al balance actual (' || v_available_balance::numeric(20,2) || ') del fondo de ahorro.';
    return;
  elseif p_is_interest = true then
    v_available_balance := v_available_balance + v_available_interest_balance;
  end if;

  if p_amount > v_available_balance then
    message := 'El monto del retiro es superior al balance actual con intereses acumulados (' || v_available_balance::numeric(20,2) || ') del fondo de ahorro.';
    return;
  end if;  

  begin
    insert into process.withdrawal(saving_fund_id, amount, is_interest)
    values (
      p_saving_fund_id
      ,p_amount
      ,p_is_interest
    )
    returning id into inserted_id;

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrión un error al realizar la operación: ' || sqlerrm;
  end;
end;
$$ language plpgsql;
