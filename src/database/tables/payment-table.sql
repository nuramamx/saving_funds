--drop table if exists process.payment cascade;
create table if not exists process.payment
(
  id integer generated always as identity,
  borrow_id integer not null,
  "number" integer not null,
  paid_amount numeric(20,6) not null,
  applied_at timestamp with time zone not null default current_timestamp,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint payment_pkey primary key (id),
  constraint payment_borrow_id_fkey foreign key (borrow_id)
    references process.borrow (id)
);