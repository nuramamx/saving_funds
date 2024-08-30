--drop table if exists log.audit;
create table if not exists "log".audit
(
  id integer generated always as identity,
  user_id integer not null,
  previous_data jsonb not null,
  new_data jsonb not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint audit_id_pkey primary key (id),
  constraint audit_user_id_fkey foreign key (user_id)
    references security.user (id)
);