--drop function system.saving_fund_annual_rate_update;
create or replace function "system".saving_fund_annual_rate_update(
  in p_id integer,
  in p_rate numeric(20,6),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_id <= 0 then
    message := 'No hay un identificador válido.';
    return;
  end if;

  if p_rate <= 0 then
    message := 'La porcentaje de interés debe ser un monto mayor a 0.';
    return;
  end if;

  begin
    update "system".saving_fund_annual_rate
      set rate = p_rate
    where id = p_id;

    inserted_id := p_id;
    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la transacción: ' || SQLERRM;
  end;
end;
$$ language plpgsql;