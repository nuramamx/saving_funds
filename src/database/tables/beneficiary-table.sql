--drop table if exists catalog.beneficiary;
create table if not exists "catalog".beneficiary
(
  id int generated always as identity,
  associate_id int not null,
  "name" varchar(100) not null,
  percentage int not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint beneficiary_pkey primary key (id),
  constraint beneficiary_associate_id_fkey foreign key (associate_id)
    references "catalog".associate (id)
);