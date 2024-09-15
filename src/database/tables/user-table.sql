--drop table if exists security.user;
create table if not exists "security"."user"
(
  id integer generated always as identity,
  username integer not null,
  "password" char(40) not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint user_pkey primary key (id)
);