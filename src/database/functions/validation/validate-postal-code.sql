--drop function public.validate_postal_code;
create or replace function public.validate_postal_code(p_postal_code text)
returns boolean as $$
begin
  if p_postal_code ~ '^\d{5}$' then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;