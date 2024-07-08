drop table if exists process.payment;
create table if not exists process.payment
(
  id integer generated always as identity,
  borrow_id integer not null,
  payment_type_id integer not null,
  payment_number smallint not null,
  amount_paid decimal(20,6) not null,
  paid_capital decimal(20,6) not null,
  paid_interest decimal(20,6) not null,
  balance decimal(20,6) not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint payment_pkey primary key (id),
  constraint payment_borrow_id_fkey foreign key (borrow_id)
    references process.borrow (id),
  constraint payment_payment_type_id_fkey foreign key (payment_type_id)
    references administration.payment_type
);