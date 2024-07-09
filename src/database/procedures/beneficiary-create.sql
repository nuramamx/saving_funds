--drop function catalog.beneficiary_create;
create or replace function catalog.beneficiary_create(
  in associate_id int,
  in beneficiaries jsonb,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  total_percentage_temp integer;
  total_percentage_actual integer;
  is_total_percentage_reached boolean := false;
begin
  success := false;
  message := 'Operación no iniciada.';

  drop table if exists temp_beneficiaries;
  create temporary table temp_beneficiaries (
    name varchar(50) not null,
    percentage smallint not null
  );

  insert into temp_beneficiaries (name, percentage)
  select 
    element ->> 'name' AS name
    ,(element ->> 'percentage')::int as percentage
  from lateral jsonb_array_elements(beneficiaries) as element;

  select sum(B.percentage) into total_percentage_actual from catalog.beneficiary as B where B.associate_id = beneficiary_create.associate_id;
  select coalesce(SUM(percentage),0) into total_percentage_temp from temp_beneficiaries;

  -- Activate a flag when the percentage reached 100% in both places
  if ((total_percentage_actual + total_percentage_temp)) = 100 then
    is_total_percentage_reached := true;
  end if;

  -- Check if the list have only 5 beneficiaries.
  if 5 < (
    select count(1) from temp_beneficiaries
  ) then
    message := 'Solo se permiten hasta 5 beneficiarios.';
    return;
  end if;

  -- Check if exists 100% of assigned beneficiaries.
  if exists(
    select 1 from catalog.beneficiary as B where B.associate_id = beneficiary_create.associate_id having sum(B.percentage) = 100
  ) THEN
    message := 'El socio ya cuenta con beneficiarios asignados al 100%.';
    return;
  end if;

  -- Check if the sum of existent beneficiaries and new beneficiaries is not over of 100%
  if ((total_percentage_actual + total_percentage_temp) > 100) then
    message := 'Ya se ha alcanzado el límite de porcentaje de los beneficiarios, disminuya o elimine alguno.';
    return;
  end if;

  -- Check if the sum of existent beneficiaries and new beneficiaries is not minor of 100%
  if ((total_percentage_actual + total_percentage_temp) < 100) THEN
    message := 'No se ha alcanzado el límite de porcentaje de los beneficiarios, aumente alguno.';
    return;
  end if;

  -- Check if name is not null or empty.
  if exists(
    select 1 from temp_beneficiaries where name = '' or name = null
  ) then
    message := 'El nombre de alguno de los beneficiarios está vacío o es núlo.';
    return;
  end if;

  -- Check if percentage is not over 100%.
  if (total_percentage_temp > 100 and is_total_percentage_reached = FALSE) then
    message := 'El porcentaje total de los beneficiarios es superior al 100%.';
    return;
  end if;

   -- Check if percentage is not minor of 100%.
  if (total_percentage_temp < 100 and is_total_percentage_reached = FALSE) then
    message := 'El porcentaje total de los beneficiarios es inferior al 100%.';
    return;
  end if;

  begin
    insert into catalog.beneficiary (associate_id, name, percentage)
    select beneficiary_create.associate_id
      ,name
      ,percentage
    from temp_beneficiaries
    where percentage <> 0
    or (name is null or name = '');

    success := true;
    message := 'Se registraron los beneficiarios correctamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la operación' || SQLERRM;
  end;
end;
$$ language plpgsql;