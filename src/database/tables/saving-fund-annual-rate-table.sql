--drop table if exists system.saving_fund_annual_rate;
create table if not exists "system".saving_fund_annual_rate
(
  id integer generated always as identity,
  "year" integer not null,
  rate decimal(20,6) not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp
);