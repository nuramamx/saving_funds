--drop view if exists system.city_list_view;
create or replace view "system".city_list_view as
  select c.id
    ,c.state_id
    ,c."name"
    ,s."name" as state_name
  from "system".city as c
  join "system".state s on c.state_id = s.id;