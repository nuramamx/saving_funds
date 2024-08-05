select 
  p.id
  ,p.paid_amount 
  ,p.applied_at 
  ,p.created_at 
  ,case
    when p.paid_amount = cast(bd.payment as numeric(20,2)) then 'PAGADO'
    else 'INCIDENCIA'
  end
  ,case
    when p.paid_amount < cast(bd.payment as numeric(20,2)) then 'El pago fue registrado con un monto menor.'
    when p.paid_amount > cast(bd.payment as numeric(20,2)) then 'El pago fue registrado con un monto mayor.'
    else 'Sin resolución'
  end
  from process.payment as p
  join process.borrow as b on b.id = 11
  join process.borrow_detail as bd on bd.borrow_id = b.id
  where p.borrow_id = 11