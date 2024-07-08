drop table if exists process.borrow_detail;

create table if not exists process.borrow_detail
(
  id integer generated always as identity,
  borrow_id integer not null,
  number_payments smallint not null,
  interests numeric(20,6) not null,
  total_due numeric(20,6) not null,
  guarantee_fund numeric(20,6) not null,
  payment numeric(20,6) not null,
  amount_delivered numeric(20,6) not null, 
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  constraint borrow_detail_pkey primary key (id),
  constraint borrow_detail_borrow_id_fkey foreign key (borrow_id)
    references process.borrow (id)
);