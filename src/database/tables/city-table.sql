--drop table if exists system.city;
create table if not exists "system".city
(
  id int generated always as identity,
  state_id int not null,
  "name" varchar(50) not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint city_pkey primary key (id),
  constraint city_state_id_fkey foreign key (state_id)
    references "system".state (id)
);