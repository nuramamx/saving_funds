--drop function deconstruct_name;
create or replace function deconstruct_name(
  in "data" jsonb
)
returns text as $$
declare
begin
  return
    replace("data"->>'firstname', '"', '') || ' ' ||
    replace("data"->>'paternal_lastname', '"', '') || ' ' ||
    replace("data"->>'maternal_lastname', '"', '') as fullname;
end;
$$ language plpgsql;
