--drop function process.borrow_quote;
create or replace function process.borrow_quote(
  p_requested_amount numeric,
  p_annual_rate numeric,
  p_period integer,
  p_is_fortnightly boolean
)
 returns table (
  payment_number smallint,
  payment numeric,
  payment_toward_capital numeric,
  payment_toward_interests numeric,
  balance numeric
)
as $$
declare
  v_borrow process.borrow_type;
begin
  -- Calculate borrow
  v_borrow := process.borrow_calculate(p_requested_amount, p_annual_rate, p_period, p_is_fortnightly);

  drop table if exists quote_borrow_temporary;
  create temporary table quote_borrow_temporary (
    payment_number smallint,
    payment numeric(20,6),
    payment_toward_capital numeric(20,6),
    payment_toward_interests numeric(20,6),
    balance numeric(20,6)
  ) on commit drop;

  with recursive quote_result as (
    select 1::smallint as payment_number
      ,v_borrow.payment::numeric(20,6) as payment
      ,(v_borrow.payment - (v_borrow.payment * v_borrow.rate))::numeric(20,6) as payment_toward_capital
      ,(v_borrow.payment * v_borrow.rate)::numeric(20,6) as payment_toward_interests
      ,(v_borrow.total_due - v_borrow.payment)::numeric(20,6) as balance
    union all
    select (bq.payment_number + 1)::smallint
      ,bq.payment::numeric(20,6)
      ,(v_borrow.payment - (v_borrow.payment * v_borrow.rate))::numeric(20,6)
      ,(v_borrow.payment * v_borrow.rate)::numeric(20,6)
      ,(bq.balance - v_borrow.payment)::numeric(20,6)
    from quote_result bq
    where bq.payment_number < v_borrow.number_payments
  )
  insert into quote_borrow_temporary
  select *
  from quote_result;

  -- Fix last payment to set balance to 0.
  update quote_borrow_temporary
  set
    payment = (quote_borrow_temporary.payment + quote_borrow_temporary.balance)
    ,balance = 0
  where quote_borrow_temporary.payment_number = v_borrow.number_payments;
  
  return query
  select * from quote_borrow_temporary;
end;
$$ language plpgsql;