--drop table if exists process.contribution cascade;
create table if not exists process.contribution
(
  id integer generated always as identity,
  saving_fund_id integer not null,
  amount numeric(20,6) not null,
  applied_at timestamp with time zone not null default current_timestamp,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint contribution_pkey primary key (id),
  constraint contribution_saving_fund_id_fkey foreign key (saving_fund_id)
    references process.saving_fund (id)
);