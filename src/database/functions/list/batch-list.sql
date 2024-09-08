--drop function system.batch_list;
create or replace function "system".batch_list()
returns table (
  id integer,
  "name" varchar,
  batch_function text,
  details jsonb,
  is_active boolean
) as $$
declare
begin
  return query
  select
    b.id
    ,b."name"
    ,b.batch_function
    ,b.details
    ,b.is_active
  from "system".batch as b
  order by b.id asc, b.is_active desc;
end;
$$ language plpgsql;
