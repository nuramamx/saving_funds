--drop function process.payment_create;
create or replace function process.payment_create(
  in p_borrow_id integer,
  in p_number integer,
  in p_paid_amount numeric(20,2),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns record as $$
declare
  v_amount_to_pay numeric(20,2);
  v_payment_type integer;
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_borrow_id <= 0 then
    message := 'El préstamo no tiene un identificador válido.';
    return;
  elseif p_paid_amount <= 0 then
    message := 'El monto del pago no tiene un valor aceptado.';
    return;
  elseif p_number = 0 or p_number < 0 then
    message := 'El número de pago no es correcto.';
    return;
  end if;

  -- Set amount to pay
  select
    cast(bd.payment as numeric(20,2))
  into v_amount_to_pay
  from process.borrow_detail as bd
  where bd.borrow_id = p_borrow_id;

  if not exists (
    select 1 from process.borrow as b where b.id = p_borrow_id
  ) then
    message := 'El préstamo asignado no existe.';
    return;
  end if;

  if cast(p_paid_amount as numeric(20,2)) > cast(v_amount_to_pay as numeric(20,2)) then
    message := 'El pago del préstamo es mayor al indicado. El monto a pagar es de $' || v_amount_to_pay || '.';
    return;
  end if;

  if (p_paid_amount < v_amount_to_pay) then
    message := 'El pago del préstamo es menor al indicado.';
    return;
  end if;

  if exists (
    select 1 from process.payment as p where p.borrow_id = p_borrow_id and p."number" = p_number
  ) then
    message := 'El préstamo ya tiene un pago asignado a ese número de pago.';
    return;
  end if;

  begin
    insert into process.payment(borrow_id, "number", paid_amount)
    values (
      p_borrow_id
      ,p_number
      ,p_paid_amount
    )
    returning id into inserted_id;
  
    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la transacción: ' || SQLERRM;
  end;
end;
$$ language plpgsql;