--drop function catalog.address_create;
create or replace function catalog.address_create(
  in associate_id integer,
  in city_id integer,
  in street varchar(50),
  in settlement varchar(50),
  in town varchar(50),
  in postal_code varchar(6),
  in phone varchar(10),
  in mobile varchar(10),
  in email varchar(50),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no inciada.';

  if street is null or street = '' then
    message := 'La calle es requerida.';
    return;
  elseif settlement is null or settlement = '' then
    message := 'La colonia es requerida.';
    return;
  elseif town is null or town = '' then
    message := 'La localidad es requerida.';
    return;
  elseif postal_code is null or postal_code = '' then
    message := 'El código postal es requerido.';
    return;
  elseif not validate_postal_code(postal_code) then
    message := 'El código postal no es válido.';
    return;
  elseif phone is null or phone = '' then
    message := 'El teléfono es requerido.';
    return;
  elseif not validate_phone(phone) then
    message := 'El teléfono no es válido.';
    return;
  elseif mobile is null or mobile = '' then
    message := 'El celular es requerido.';
    return;
  elseif email is null or email = '' then
    message := 'El email es requerido.';
    return;
  elseif not validate_email(email) then
    message := 'El email no es válido.';
    return;
  elseif associate_id = 0 then
    message := 'El socio ligado a la localización no es válido.';
    return;
  elseif city_id = 0 then
    message := 'La ciudad ligada a la localización no es válida.';
    return;
  end if;

  if not exists(
    select 1 from catalog.associate as A where A.id = address_create.associate_id for update skip locked
  ) then
    message := 'El asociado no existe en el sistema.';
    return;
  end if;

  if not exists(
    select 1 from administration.city as C where C.id = address_create.city_id
  ) then
    message := 'La ciudad no existe en el sistema.';
    return;
  end if;

  begin
    insert into catalog.address
      (associate_id, city_id, street, settlement, town, postal_code, phone, mobile, email)
    values (
      address_create.associate_id
      ,address_create.city_id
      ,upper(street)
      ,upper(settlement)
      ,upper(town)
      ,upper(postal_code)
      ,upper(phone)
      ,upper(mobile)
      ,upper(email)
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