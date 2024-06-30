drop view if exists administration.agreement_view;
create or replace view administration.agreement_view as
  select A.id
    ,A.name
  from administration.agreement A