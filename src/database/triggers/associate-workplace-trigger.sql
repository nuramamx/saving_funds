--drop function catalog.associate_workplace_validate;
create or replace function "catalog".associate_workplace_validate()
returns trigger as $$
begin
  if not (tg_op = 'DELETE') then
    if new.workplace->>'key' is null or trim(new.workplace->>'key') = '' then
      raise exception 'Especifique la clave del centro de trabajo.';
    end if;

    if new.workplace->>'name' is null or trim(new.workplace->>'name') = '' then
      raise exception 'Especifique el nombre del centro de trabajo.';
    end if;

    if new.workplace->>'phone' is null or trim(new.workplace->>'phone') = '' or validate_phone((new.address->>'phone')::text) = false then
      raise exception 'Especifique el teléfono del centro de trabajo.';
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

create or replace trigger associate_workplace_trigger
before insert or update on "catalog".associate
for each row execute function "catalog".associate_workplace_validate();