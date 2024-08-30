--drop table if exists catalog.address;
create table if not exists "catalog".address
(
  id integer generated always as identity,
  associate_id integer not null,
  city_id integer not null,
  street varchar(50) not null,
  settlement varchar(50) not null,
  town varchar(50) not null,
  postal_code varchar(6) not null constraint postal_code_validate check (postal_code ~ '^\d{5}$'),
  phone varchar(10) not null constraint phone_validate check (phone ~ '^\d{10}$'),
  mobile varchar(10) not null constraint mobile_validate check (mobile ~ '^\d{10}$'),
  email varchar(100) not null constraint email_validate check (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint address_pkey primary key (id),
  constraint address_associate_id_key unique (associate_id),
  constraint address_associate_id_fkey foreign key (associate_id)
    references "catalog".associate (id),
  constraint address_city_id_fkey foreign key (city_id)
    references administration.city (id)
);