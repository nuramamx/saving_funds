--drop function catalog.associate_detail_create;
create or replace function catalog.associate_detail_create(
  in associate_id integer,
  in agreement_id integer,
  in dependency_key varchar(10),
  in category varchar(8),
  in salary decimal(20,6),
  in social_contribution decimal(20,6),
  in fortnightly_contribution decimal(20,6),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no inciada.';

  if dependency_key is null or dependency_key = '' then
    message := 'La clave de dependencia es requerida.';
    return;
  elseif category is null or category = '' then
    message := 'La categoría es requerida.';
    return;
  elseif (salary <= 0) then
    message := 'El salario/pensión debe ser mayor a 0.';
    return;
  elseif (social_contribution <= 0) then
    message := 'La aportación social debe ser mayor a 0.';
    return;
  elseif (fortnightly_contribution <= 0) then
    message := 'La aportación quincenal debe ser mayor a 0.';
    return;
  elseif associate_id = 0 then
    message := 'El socio no es válido.';
    return;
  elseif agreement_id = 0 then
    message := 'El convenio no es válido.';
    return;
  end if;

  begin
    insert into catalog.associate_detail
      (associate_id, agreement_id, dependency_key, category, salary, social_contribution, fortnightly_contribution)
    values (
      associate_id
      ,agreement_id
      ,upper(dependency_key)
      ,upper(category)
      ,salary
      ,social_contribution
      ,fortnightly_contribution
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