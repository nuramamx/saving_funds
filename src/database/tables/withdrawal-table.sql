--drop table if exists process.withdrawal cascade;
create table if not exists process.withdrawal
(
  id integer generated always as identity,
  saving_fund_id integer not null,
  amount numeric(20,6) not null,
  is_yields boolean not null default false,
  is_leave boolean not null default false,
  is_decease boolean not null default false,
  applied_at timestamp with time zone not null default current_timestamp,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint withdrawal_pkey primary key (id),
  constraint withdrawal_saving_fund_id_fkey foreign key (saving_fund_id)
    references process.saving_fund (id)
);