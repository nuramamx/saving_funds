--drop function catalog.workplace_create;
create or replace function catalog.workplace_create(
  in associate_id integer,
  in key varchar(5),
  in name varchar(50),
  in phone varchar(10),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no inciada.';

  if key is null or key = '' then
    message := 'La clave del centro de trabajo es requerida.';
    return;
  elseif name is null or name = '' then
    message := 'El nombre del centro de trabajo es requerido.';
    return;
  elseif phone is null or phone = '' then
    message := 'El teléfono del centro de trabajo es requerido.';
    return;
  elseif not validate_phone(phone) then
    message := 'El teléfono no es válido.';
    return;
  elseif associate_id = 0 then
    message := 'El asociado ligado al centro de trabajo no es válido.';
    return;
  end if;

  if not exists(
    select 1 from catalog.associate as A where A.id = workplace_create.associate_id for update skip locked
  ) then
    message := 'El asociado no existe en el sistema.';
    return;
  end if;

  begin
    insert into catalog.workplace (associate_id, key, name, phone)
    values (
      workplace_create.associate_id
      ,upper(key)
      ,upper(name)
      ,upper(phone)
    )
    returning id into inserted_id;

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la operación: ' || SQLERRM;
  end;
end;
$$ language plpgsql;