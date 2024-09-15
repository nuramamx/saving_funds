--drop function public.validate_email;
create or replace function public.validate_email(p_email text)
returns boolean as $$
begin
  if p_email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;