--drop function catalog.associate_create;
create or replace function catalog.associate_create(
  in firstname varchar(25),
  in middlename varchar(25),
  in paternal_lastname varchar(25),
  in maternal_lastname varchar(25),
  in rfc varchar(13),
  in gender char(1),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no inciada.';

  if firstname is null or firstname = '' then
    message := 'El primer nombre es requerido.';
    return;
  elseif paternal_lastname is null or paternal_lastname = '' then
    message := 'El apellido paterno es requerido.';
    return;
  elseif maternal_lastname is null or maternal_lastname = '' then
    message := 'El apellido materno es requerido.';
    return;
  elseif rfc is null or rfc = '' then
    message := 'El R.F.C. es requerido.';
    return;
  elseif length(rfc) <> 10 and length(rfc) <> 13 then
    message := 'El R.F.C. debe tener 10 o 13 caracteres.';
    return;
  elseif gender is null or gender = '' then
    message := 'El género es requerido.';
    return;
  elseif gender not in ('M', 'F') then
    message := 'El género debe ser "M" (Masculino) o "F" (Femenino).';
    return;
  end if;

  if exists(
    select 1 from catalog.associate A where A.rfc = associate_create.rfc
  ) then
    message := 'El R.F.C. ya se encuentra registrado.';
    return;
  end if;

  begin
    insert into catalog.associate (rfc, gender, name)
    values (
      upper(rfc)
      ,upper(gender)
      ,jsonb_build_object(
        'firstname', upper(firstname),
        'middlename', upper(middlename),
        'paternal_lastname', upper(paternal_lastname),
        'maternal_lastname', upper(maternal_lastname)
      )
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