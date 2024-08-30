--drop view if exists administration.state_list_view;
create or replace view administration.state_list_view as
  select s.id
    ,s."key"
    ,s."name"
  from administration.state as s;