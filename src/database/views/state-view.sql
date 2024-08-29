drop view if exists administration.state_view;
create or replace view administration.state_view as
  select s.id
    ,s."key"
    ,s."name"
  from administration.state as s;