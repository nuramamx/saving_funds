--drop view if exists system.state_list_view;
create or replace view "system".state_list_view as
  select s.id
    ,s."key"
    ,s."name"
  from "system".state as s;