--drop table if exists catalog.associate cascade;
create table if not exists "catalog".associate
(
  id integer generated always as identity,
  name jsonb not null,
  rfc varchar(13) not null,
  gender char(1) not null,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default CURRENT_TIMESTAMP,
  updated_at timestamp with time zone not null default CURRENT_TIMESTAMP,
  constraint associate_pkey primary key (id),
  constraint associate_rfc_key unique (rfc)
);