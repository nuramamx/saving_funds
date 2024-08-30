--drop table if exists process.saving_fund cascade;
create table if not exists process.saving_fund
(
  id integer generated always as identity,
  associate_id integer not null,
  opening_balance decimal(20,6) not null default 0,
  annual_rate decimal(20,6) not null,
  is_fortnightly boolean not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint saving_fund_pkey primary key (id),
  constraint saving_fund_associate_id_fkey foreign key (associate_id)
    references "catalog".associate (id)
);