--drop function security.user_data_by_user_and_password
create or replace function "security".user_data_by_user_and_password(
  p_username text,
  p_password text
)
returns table (
  id integer,
  username text,
  "role" text
) as $$
declare
begin
  return query
  select
    u.id
    ,u.username
    ,u.role
  from "security".user as u
  where u.username = p_username
  and u.password::text = p_password
  limit 1;
end;
$$ language plpgsql;