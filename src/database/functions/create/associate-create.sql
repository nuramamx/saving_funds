--drop function catalog.associate_create;
create or replace function catalog.associate_create(
  in p_firstname varchar(25),
  in p_middlename varchar(25),
  in p_paternal_lastname varchar(25),
  in p_maternal_lastname varchar(25),
  in p_rfc varchar(13),
  in p_gender char(1),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no inciada.';

  if p_firstname is null or p_firstname = '' then
    message := 'El primer nombre es requerido.';
    return;
  elseif p_paternal_lastname is null or p_paternal_lastname = '' then
    message := 'El apellido paterno es requerido.';
    return;
  elseif p_maternal_lastname is null or p_maternal_lastname = '' then
    message := 'El apellido materno es requerido.';
    return;
  elseif p_rfc is null or p_rfc = '' then
    message := 'El R.F.C. es requerido.';
    return;
  elseif length(p_rfc) <> 10 and length(p_rfc) <> 13 then
    message := 'El R.F.C. debe tener 10 o 13 caracteres.';
    return;
  elseif p_gender is null or p_gender = '' then
    message := 'El género es requerido.';
    return;
  elseif p_gender not in ('M', 'F') then
    message := 'El género debe ser "M" (Masculino) o "F" (Femenino).';
    return;
  end if;

  if exists(
    select 1 from "catalog".associate as a where a.rfc = p_rfc
  ) then
    message := 'El R.F.C. ya se encuentra registrado.';
    return;
  end if;

  begin
    insert into "catalog".associate (rfc, gender, "name")
    values (
      upper(p_rfc)
      ,upper(p_gender)
      ,jsonb_build_object(
        'firstname', upper(p_firstname),
        'middlename', upper(p_middlename),
        'paternal_lastname', upper(p_paternal_lastname),
        'maternal_lastname', upper(p_maternal_lastname)
      )
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