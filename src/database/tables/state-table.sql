--drop table if exists administration.state;
create table if not exists administration.state
(
  id int generated always as identity,
  "key" char(3) not null,
  "name" varchar(50) not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint state_pkey primary key (id)
);