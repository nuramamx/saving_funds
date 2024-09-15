--drop function catalog.associate_beneficiaries_validate;
create or replace function "catalog".associate_beneficiaries_validate()
returns trigger as $$
declare
  v_element jsonb;
  v_idx integer;
  v_percentage_sum numeric(20,2);
begin
  if not (tg_op = 'DELETE') then
    v_idx := 1;
    v_percentage_sum := 0.00;

    for v_element in 
      select
        elem
      from jsonb_array_elements(new.beneficiaries) as elem
    loop
      if v_element->>'name' is null or trim(v_element->>'name') = '' then
        raise exception 'Especifique el nombre del beneficiario #%.', v_idx;
      end if;
  
      if v_element->>'percentage' is null or (v_element->>'percentage')::numeric(20,2) <= 0 then
        raise exception 'Especifique el porcentaje del beneficiario #%.', v_idx;
      end if;

      v_percentage_sum := v_percentage_sum + (v_element->>'percentage')::numeric(20,2);
      v_idx := v_idx + 1;
    end loop;

    if v_percentage_sum > 100 then
      raise exception 'El total de porcentaje de los beneficiarios sobrepasa el límite del 100%%.';
    end if;

    if v_percentage_sum < 100 then
      raise exception 'El total de porcentaje de los beneficiarios debe ser del 100%%.';
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

create or replace trigger associate_beneficiaries_trigger
before insert or update on "catalog".associate
for each row execute function "catalog".associate_beneficiaries_validate();