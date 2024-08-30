--drop view if exists administration.city_list_view;
create or replace view administration.city_list_view as
  select c.id
    ,c.state_id
    ,c."name"
    ,s."name" as state_name
  from administration.city as c
  join administration.state s on c.state_id = s.id;