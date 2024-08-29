--drop function public.validate_email;
create or replace function public.validate_email(p_email text)
returns boolean as $$
begin
  if p_email ~ '^[a-za-z0-9._%+-]+@[a-za-z0-9.-]+\.[a-za-z]{2,}$' then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;