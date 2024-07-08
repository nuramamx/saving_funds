drop view if exists administration.annual_rate_view;
create or replace view administration.annual_rate_view as
  select A.id
    ,A.rate
    ,A.period
  from administration.annual_rate A