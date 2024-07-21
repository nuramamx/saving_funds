--drop function process.payment_create;
create or replace function process.payment_create(
  in borrow_id integer,
  in payment_amount numeric,
  in payment_number integer,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  inserted_id integer;
  amount_to_pay numeric(20,6);
begin
  success := false;
  message := 'Operación no iniciada.';

  if borrow_id <= 0 then
    message := 'El préstamo no tiene un identificador válido.';
    return;
  elseif payment_amount <= 0 then
    message := 'El monto del pago no tiene un valor aceptado.';
    return;
  elseif payment_number <= 0 then
    message := 'El número de pago no es correcto.'
    return;
  end if;

  -- Set amount to pay
  select bd.payment::numeric(20,6) into amount_to_pay
  from process.borrow_detail as bd
  where bd.borrow_id = borrow_id;

  if not exists (
    select 1 from process.borrow as b where b.id = borrow_id and b.is_settled = false
  ) then
    message := 'El préstamo asignado no existe o ya está liquidado.';
    return;
  end if;

  if payment_amount::numeric(20,6) > amount_to_pay then
    message := 'El pago del préstamo es mayor al indicado.';
    return;
  end if;

  if payment_amount::numeric(20,6) < amount_to_pay then
    message := 'El pago del préstamo es menor al indicado.';
    return;
  end if;

  if exists (
    select 1 from process.payment as p where p.borrow_id = borrow_id and b.payment_number = payment_number
  ) then
    message := 'El préstamo ya tiene un pago asignado a ese número de pago.';
    return;
  end if;

  begin
    insert into process.payment (borrow_id, payment_type_id, payment_number, amount_paid, paid_capital, paid_interest, balance)
    values (
      borrow_id
      ,1
      ,payment_number
      ,payment_amount
      ,0
      ,0
      ,0
    )
    returning id into inserted_id;
  
    success := true;
    message := 'El pago se ha registrado con éxito.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la operación: ' || SQLERRM;
  end;
end;
$$ language plpgsql;