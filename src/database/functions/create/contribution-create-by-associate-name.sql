--drop function process.contribution_create_by_associate_name;
create or replace function process.contribution_create_by_associate_name(
  in p_associate_name text,
  in p_amount numeric,
  in p_applied_at timestamp with time zone,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_saving_fund_id integer;
  v_server_datetime timestamp with time zone;
begin
  success := false;
  message := 'Operación no iniciada.';

  if length(p_associate_name) = 0 then
    message := 'El nombre del socio no puede estar vacío.';
    return;
  end if;

  if p_amount <= 0 then
    message := 'El monto de la aportación debe ser mayor a cero.';
    return;
  end if;

  v_saving_fund_id := (
    select
      s.id
    from process.saving_fund as s
    join catalog.associate as a on s.associate_id = a.id
    where a.name = trim(upper(p_associate_name))
  );

  if v_saving_fund_id <= 0 then
    message := 'Fondo de ahorro no pudo ser localizado.'
    return;
  end if;

  v_server_datetime := (p_applied_at::date + current_time::time);

  begin
    insert into process.contribution(saving_fund_id, amount, applied_at)
    values (
      v_saving_fund_id
      ,p_amount
      ,v_server_datetime
    ) returning id into inserted_id;

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la transacción: ' || sqlerrm;
  end;
end;
$$ language plpgsql;
