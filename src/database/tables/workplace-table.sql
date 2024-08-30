--drop table if exists catalog.workplace;
create table if not exists "catalog".workplace
(
  id integer generated always as identity,
  associate_id integer not null,
  "key" varchar(5) not null,
  "name" varchar(50) not null,
  phone varchar(10) not null constraint phone_validate check (phone ~ '^\d{10}$'),
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint workplace_pkey primary key (id),
  constraint workplace_associate_id_key unique (associate_id),
  constraint workplace_associate_id_fkey foreign key (associate_id)
    references "catalog".associate (id)
);