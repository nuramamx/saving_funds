--drop function catalog.associate_delete;
create or replace function "catalog".associate_delete(
  in p_id integer,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns record as $$
declare
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_id <= 0 then
    message := 'No hay un identificador válido.';
    return;
  end if;

  begin
    update "catalog".associate
      set is_active = false
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