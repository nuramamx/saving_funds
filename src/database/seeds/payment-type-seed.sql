insert into administration.payment_type (key, name, description)
values
  ('CRT', 'CORRIENTE', 'Refiere al pago que esta dentro del periodo.'),
  ('RET', 'RETRASO', 'Refiere al pago que esta fuera del periodo.'),
  ('ANT', 'ANTICIPO', 'Refiere a un pago adicional al pago corriente, provocando una reestructuración del préstamo.'),
  ('CRC', 'CORRECCIÓN', 'Refiere a un pago que se usará para corregir un pago incorrecto, provocando una reestructuración del préstamo.'),
  ('LIQ', 'LIQUIDACIÓN', 'Refiere a un pago único para liquidar el saldo restante, provocando cierre del préstamo.');