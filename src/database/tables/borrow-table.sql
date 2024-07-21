drop table if exists process.borrow cascade;

create table if not exists process.borrow
(
  id integer generated always as identity,
  associate_id integer not null,
  parent_borrow_id integer null,
  requested_amount numeric(20,6) not null,
  period smallint not null,
  annual_rate numeric(20,6) not null,
  is_fortnightly boolean not null,
  is_settled boolean not null default false, 
  start_at timestamp with time zone not null default current_timestamp,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint borrow_pkey primary key (id),
  constraint borrow_associate_id_fkey foreign key (associate_id)
    references catalog.associate (id),
  constraint borrow_parent_borrow_id_fkey foreign key (parent_borrow_id)
    references process.borrow (id)
);