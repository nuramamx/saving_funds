--drop table json_temporary;
create table if not exists json_temporary
(
  json_a jsonb null,
  json_b jsonb null,
  json_c jsonb null
)