--drop function process.borrow_authorization_report_data;
create or replace function process.borrow_authorization_report_data(
  in p_borrow_id integer
)
returns table (
  current_year integer,
  associate_name text,
  period text,
  is_fortnightly boolean,
  requested_amount numeric(20,6),
  requested_amount_in_words text,
  total_with_interests numeric(20,6),
  guarantee_fund numeric(20,6),
  total_due numeric(20,6),
  payment numeric(20,6),
  start_at text,
  payment_in_words text
) as $$
declare
  v_current_year integer;
begin
  -- Get the current year.
  v_current_year := (select extract(year from now())::integer);

  return query
  select
    v_current_year as current_year
    ,a.name::text as associate_name
    ,case
      when b.is_fortnightly then (24 * b."period"::integer) || ' QUINCENAS'
      else (12 * b."period"::integer ) || ' MESES' end
      as "period"
    ,b.is_fortnightly
    ,b.requested_amount
    ,number_to_words(b.requested_amount) as requested_amount_in_words
    ,(bd.total_due - bd.guarantee_fund) as total_with_interests
    ,bd.guarantee_fund
    ,(bd.total_due) as total_due
    ,bd.payment
    ,to_char(b.start_at, 'YYYY-MM-dd') as start_at
    ,number_to_words(bd.payment) as payment_in_words
  from process.borrow as b
  join process.borrow_detail as bd on b.id = bd.borrow_id
  join catalog.associate as a on b.associate_id = a.id
  where b.id = p_borrow_id
  limit 1;
end;
$$ language plpgsql;