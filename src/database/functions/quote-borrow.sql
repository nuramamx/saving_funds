--drop function process.quote_borrow;
create or replace function process.quote_borrow(requested_amount numeric, annual_rate numeric, period integer, is_fortnightly boolean)
 returns table (
  payment_number smallint,
  paymnent numeric,
  payment_toward_capital numeric,
  payment_toward_interests numeric,
  balance numeric
)
as $$
declare
  borrow process.borrow_type;
  annual_rate numeric(20,6);
begin
  select ar.rate into annual_rate
  from administration.annual_rate ar
  where ar.period = quote_borrow.period;

  -- Calculate borrow
  borrow := process.calculate_borrow(requested_amount, annual_rate, period, is_fortnightly);

  create temporary table quote_borrow_temporary (
    payment_number smallint,
    payment numeric(20,6),
    payment_toward_capital numeric(20,6),
    payment_toward_interests numeric(20,6),
    balance numeric(20,6)
  ) on commit drop;

  with recursive quote_result as (
    select 1::smallint as payment_number
      ,borrow.payment::numeric(20,6) as payment
      ,(borrow.payment - (borrow.payment * borrow.rate))::numeric(20,6) as payment_toward_capital
      ,(borrow.payment * borrow.rate)::numeric(20,6) as payment_toward_interests
      ,(borrow.total_due - borrow.payment)::numeric(20,6) as balance
    union all
    select (bq.payment_number + 1)::smallint
      ,bq.payment::numeric(20,6)
      ,(borrow.payment - (borrow.payment * borrow.rate))::numeric(20,6)
      ,(borrow.payment * borrow.rate)::numeric(20,6)
      ,(bq.balance - borrow.payment)::numeric(20,6)
    from quote_result bq
    where bq.payment_number < borrow.number_payments
  )
  insert into quote_borrow_temporary
  select *
  from quote_result;

  -- Fix last payment to set balance to 0.
  update quote_borrow_temporary
  set payment = (quote_borrow_temporary.payment + quote_borrow_temporary.balance)
    ,balance = 0
  where quote_borrow_temporary.payment_number = borrow.number_payments;
  
  return query
  select * from quote_borrow_temporary;
end;
$$ language plpgsql;