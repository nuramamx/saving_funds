drop table if exists administration.annual_rate;

create table if not exists administration.annual_rate
(
  id integer generated always as identity,
  rate decimal(20,6) not null,
  period smallint not null constraint validate_period check (period in (1, 2, 3)),
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp
);