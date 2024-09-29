--drop function catalog.associate_address_validate;
create or replace function "catalog".associate_address_validate()
returns trigger as $$
declare
  v_new_json jsonb;
  v_state_id integer;
  v_city_id integer;
begin
  if not (tg_op = 'DELETE') then
    if (trim(new.address->>'state') <> '') then
      v_state_id := (
        select
          s.id
        from "system".state as s
        where s.name = upper(trim(new.address->>'state'))
        limit 1
      );

      if (v_state_id is not null) then
        new.address := jsonb_set(new.address, '{stateId}', to_jsonb(v_state_id))::jsonb;
      end if;
    end if;

    if (trim(new.address->>'city') <> '') then
      v_city_id := (
        select
          c.id
        from "system".city as c
        where c.name = upper(trim(new.address->>'city'))
        limit 1
      );

      if (v_city_id is not null) then
        new.address := jsonb_set(new.address, '{cityId}', to_jsonb(v_city_id))::jsonb;
      end if;
    end if;

    if new.address->>'stateId' is null or coalesce((new.address->>'stateId')::integer, 0) <= 0 then
      raise exception 'Especifique el estado.';
    end if;

    if new.address->>'cityId' is null or coalesce((new.address->>'cityId')::integer, 0) <= 0 then
      raise exception 'Especifique la ciudad.';
    end if;

    if new.address->>'street' is null or trim(new.address->>'street') = '' then
      raise exception 'Especifique la calle y número';
    end if;

    if new.address->>'settlement' is null or trim(new.address->>'settlement') = '' then
      raise exception 'Especifique la colonia.';
    end if;

    if new.address->>'town' is null or trim(new.address->>'town') = '' then
      raise exception 'Especifique el municipio.';
    end if;

    if new.address->>'postalCode' is null or trim(new.address->>'postalCode') = '' or validate_postal_code((new.address->>'postalCode')::text) = false then
      raise exception 'Especifique un código postal válido.';
    end if;

    if new.address->>'phone' is null or trim(new.address->>'phone') = '' or validate_phone((new.address->>'phone')::text) = false then
      raise exception 'Especifique un teléfono válido.';
    end if;

    if new.address->>'mobile' is null or trim(new.address->>'mobile') = '' or validate_phone((new.address->>'mobile')::text) = false then
      raise exception 'Especifique un celular válido.';
    end if;

    if new.address->>'email' is null or trim(new.address->>'email') = '' or validate_email((new.address->>'email')::text) = false then
      raise exception 'Especifique un email válido.';
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

create or replace trigger associate_address_trigger
before insert or update on "catalog".associate
for each row execute function "catalog".associate_address_validate();