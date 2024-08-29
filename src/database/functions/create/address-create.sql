--drop function catalog.address_create;
create or replace function "catalog".address_create(
  in p_associate_id integer,
  in p_city_id integer,
  in p_street varchar(50),
  in p_settlement varchar(50),
  in p_town varchar(50),
  in p_postal_code varchar(6),
  in p_phone varchar(10),
  in p_mobile varchar(10),
  in p_email varchar(50),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no inciada.';

  if p_street is null or p_street = '' then
    message := 'La calle es requerida.';
    return;
  elseif p_settlement is null or p_settlement = '' then
    message := 'La colonia es requerida.';
    return;
  elseif p_town is null or p_town = '' then
    message := 'La localidad es requerida.';
    return;
  elseif p_postal_code is null or p_postal_code = '' then
    message := 'El código postal es requerido.';
    return;
  elseif not validate_postal_code(p_postal_code) then
    message := 'El código postal no es válido.';
    return;
  elseif p_phone is null or p_phone = '' then
    message := 'El teléfono es requerido.';
    return;
  elseif not validate_phone(p_phone) then
    message := 'El teléfono no es válido.';
    return;
  elseif p_mobile is null or p_mobile = '' then
    message := 'El celular es requerido.';
    return;
  elseif p_email is null or p_email = '' then
    message := 'El email es requerido.';
    return;
  elseif not validate_email(p_email) then
    message := 'El email no es válido.';
    return;
  elseif p_associate_id = 0 then
    message := 'El socio ligado a la localización no es válido.';
    return;
  elseif p_city_id = 0 then
    message := 'La ciudad ligada a la localización no es válida.';
    return;
  end if;

  if not exists(
    select 1 from "catalog".associate as a where a.id = p_associate_id for update skip locked
  ) then
    message := 'El asociado no existe en el sistema.';
    return;
  end if;

  if not exists(
    select 1 from administration.city as c where c.id = p_city_id
  ) then
    message := 'La ciudad no existe en el sistema.';
    return;
  end if;

  begin
    insert into "catalog".address
      (associate_id, city_id, street, settlement, town, postal_code, phone, mobile, email)
    values (
      p_associate_id
      ,p_city_id
      ,upper(p_street)
      ,upper(p_settlement)
      ,upper(p_town)
      ,upper(p_postal_code)
      ,upper(p_phone)
      ,upper(p_mobile)
      ,upper(p_email)
    )
    returning id into inserted_id;

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la transacción: ' || sqlerrm;
  end;
end;
$$ language plpgsql;