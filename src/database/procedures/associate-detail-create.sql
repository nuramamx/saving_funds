--drop function catalog.associate_detail_create;
create or replace function catalog.associate_detail_create(
  in p_associate_id integer,
  in p_agreement_id integer,
  in p_dependency_key varchar(10),
  in p_category varchar(8),
  in p_salary decimal(20,6),
  in p_social_contribution decimal(20,6),
  in p_fortnightly_contribution decimal(20,6),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no inciada.';

  if p_dependency_key is null or p_dependency_key = '' then
    message := 'La clave de dependencia es requerida.';
    return;
  elseif p_category is null or p_category = '' then
    message := 'La categoría es requerida.';
    return;
  elseif (p_salary <= 0) then
    message := 'El salario/pensión debe ser mayor a 0.';
    return;
  elseif (p_social_contribution <= 0) then
    message := 'La aportación social debe ser mayor a 0.';
    return;
  elseif (p_fortnightly_contribution <= 0) then
    message := 'La aportación quincenal debe ser mayor a 0.';
    return;
  elseif p_associate_id = 0 then
    message := 'El socio no es válido.';
    return;
  elseif p_agreement_id = 0 then
    message := 'El convenio no es válido.';
    return;
  end if;

  begin
    insert into "catalog".associate_detail
      (associate_id, agreement_id, dependency_key, category, salary, social_contribution, fortnightly_contribution)
    values (
      p_associate_id
      ,p_agreement_id
      ,upper(p_dependency_key)
      ,upper(p_category)
      ,p_salary
      ,p_social_contribution
      ,p_fortnightly_contribution
    )
    returning id into inserted_id;

    success := true;
    message := 'El detalle del socio se ha registrado con éxito.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la operación: ' || SQLERRM;
  end;
end;
$$ language plpgsql;