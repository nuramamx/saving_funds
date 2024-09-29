--drop function process.payment_create_by_associate_rfc;
create or replace function process.payment_create_by_associate_rfc(
  in p_associate_rfc text,
  in p_number integer,
  in p_amount numeric(20,2),
  in p_applied_at timestamp with time zone,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_borrow_id integer;
  v_amount_to_pay numeric(20,2);
  v_payment_type integer;
begin
  success := false;
  message := 'Operación no iniciada.';

  if length(p_associate_rfc) <= 0 then
    message := 'El rfc del socio no puede estar vacío.';
    return;
  elseif p_amount <= 0 then
    message := 'El monto del pago no tiene un valor aceptado.';
    return;
  elseif p_number = 0 or p_number < 0 then
    message := 'El número de pago no es correcto.';
    return;
  end if;

  v_borrow_id := (
    select
      b.id
    from process.borrow as b
    join catalog.associate as a on b.associate_id = a.id
    where a.rfc = trim(upper(p_associate_rfc))
    and b.is_settled = false
    order by b.created_at desc
    limit 1
  );

  -- Set amount to pay
  select
    cast(bd.payment as numeric(20,2))
  into v_amount_to_pay
  from process.borrow_detail as bd
  where bd.borrow_id = v_borrow_id;

  if not exists (
    select 1 from process.borrow as b where b.id = v_borrow_id and b.is_settled = false
  ) then
    message := 'El préstamo asignado no existe o ya está liquidado.';
    return;
  end if;

  if cast(p_amount as numeric(20,2)) > cast(v_amount_to_pay as numeric(20,2)) then
    message := 'El pago del préstamo es mayor al indicado. El monto a pagar es de $' || v_amount_to_pay || '.';
    return;
  end if;

  if (p_amount < v_amount_to_pay) then
    message := 'El pago del préstamo es menor al indicado. ';
    return;
  end if;

  if exists (
    select 1 from process.payment as p where p.borrow_id = v_borrow_id and p."number" = p_number
  ) then
    message := 'El préstamo ya tiene un pago asignado a ese número de pago.';
    return;
  end if;

  begin
    insert into process.payment(borrow_id, "number", paid_amount, applied_at)
    values (
      v_borrow_id
      ,p_number
      ,p_amount
      ,p_applied_at
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