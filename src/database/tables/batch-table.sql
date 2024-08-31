--drop table if exists system.batch;
create table if not exists "system".batch
(
  id integer generated always as identity,
  "name" integer not null,
  batch_function text not null,
  is_active boolean not null default false,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint "system" primary key (id)
);