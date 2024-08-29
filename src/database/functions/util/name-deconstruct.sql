--drop function public.name_deconstruct;
create or replace function public.name_deconstruct(
  in p_data jsonb
)
returns text as $$
declare
begin
  return
    replace(p_data->>'firstname', '"', '') || ' ' ||
    replace(p_data->>'paternal_lastname', '"', '') || ' ' ||
    replace(p_data->>'maternal_lastname', '"', '') as fullname;
end;
$$ language plpgsql;
