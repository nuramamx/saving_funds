--drop table if exists system.batch_detail;
create table if not exists "system".batch_detail
(
  id integer generated always as identity,
  batch_id integer not null,
  "name" varchar(50) not null,
  description varchar(250) not null,
  "type" varchar(30) not null,
  "parameter" varchar(50) not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint batch_detail_pkey primary key (id),
  constraint batch_detail_batch_id_fkey foreign key (batch_id)
    references "system".batch_detail (id)
);