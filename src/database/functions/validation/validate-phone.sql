--drop function public.validate_phone;
create or replace function public.validate_phone(p_phone text)
returns boolean as $$
begin
  if p_phone ~ '^\d{10}$' then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;