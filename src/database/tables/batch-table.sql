--drop table if exists system.batch;
create table if not exists "system".batch
(
  id integer generated always as identity,
  "name" varchar(30) not null,
  batch_function text not null,
  details jsonb not null,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint batch_pkey primary key (id)
);