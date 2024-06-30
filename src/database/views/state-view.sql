drop view if exists administration.state_view;
create or replace view administration.state_view as
  select S.id
    ,S.key
    ,S.name
  from administration.state S