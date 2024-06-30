create or replace view administration.city_view as
  select C.id
    ,C.state_id
    ,C.name
    ,S.name as state_name
  from administration.city C
  join administration.state S on C.state_id = S.id