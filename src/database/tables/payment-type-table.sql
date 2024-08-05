drop table if exists administration.payment_type cascade;

create table if not exists administration.payment_type
(
  id integer generated always as identity,
  key char(3) not null,
  name varchar(25) not null,
  description varchar(250) not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint payment_type_pkey primary key (id)
);