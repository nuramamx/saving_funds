--drop function catalog.workplace_create;
create or replace function catalog.workplace_create(
  in p_associate_id integer,
  in p_key varchar(5),
  in p_name varchar(50),
  in p_phone varchar(10),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no inciada.';

  if p_key is null or p_key = '' then
    message := 'La clave del centro de trabajo es requerida.';
    return;
  elseif p_name is null or p_name = '' then
    message := 'El nombre del centro de trabajo es requerido.';
    return;
  elseif p_phone is null or p_phone = '' then
    message := 'El teléfono del centro de trabajo es requerido.';
    return;
  elseif not validate_phone(p_phone) then
    message := 'El teléfono no es válido.';
    return;
  elseif p_associate_id = 0 then
    message := 'El asociado ligado al centro de trabajo no es válido.';
    return;
  end if;

  if not exists(
    select 1 from "catalog".associate as a where a.id = p_associate_id for update skip locked
  ) then
    message := 'El asociado no existe en el sistema.';
    return;
  end if;

  begin
    insert into catalog.workplace(associate_id, "key", "name", phone)
    values (
      p_associate_id
      ,upper(p_key)
      ,upper(p_name)
      ,upper(p_phone)
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