--drop type process.borrow_type cascade;
create type process.borrow_type as (
  rate numeric(20,6),
  number_payments smallint,
  payment numeric(20,6),
  interests numeric(20,6),
  total_due numeric(20,6),
  guarantee_fund numeric(20,6)
);