--drop table if exists administration.agreement;
create table if not exists administration.agreement
(
  id integer generated always as identity,
  "name" varchar(50) not null,
  created_at time with time zone not null default current_timestamp,
  updated_at time with time zone not null default current_timestamp,
  constraint agreement_pkey primary key (id)
);