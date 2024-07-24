-- drop function process.generate_payment_schedule;
create or replace function process.generate_payment_schedule(
  in start_date timestamp,
  in number_payments integer,
  in is_fortnightly boolean
)
returns table (
  "date" timestamp,
  "year" integer,
  "month" integer,
  "number" integer
) as $$
declare
begin
  return query
  with recursive params as (
    select start_date as initial_date
  ),
  fortnightly_series as (
    select 1 as row_counter,
      case
        when date_trunc('month', initial_date) + interval '14 days' > initial_date
          then date_trunc('month', initial_date) + interval '14 days'
          else date_trunc('month', initial_date + interval '1 month') + interval '14 days'
      end as payment_date
      from params
      union all
      select row_counter + 2
        ,date_trunc('month', payment_date + interval '1 month') + interval '14 days'
      from fortnightly_series, params
      where row_counter + 2 <= number_payments
  ),
  end_of_month_series as (
    select 1 as row_counter
      ,(date_trunc('month', initial_date) + interval '1 month - 1 day')::timestamp as payment_date
    from params
    union all
    select row_counter + 1
      ,(date_trunc('month', payment_date + interval '1 day') + interval '1 month - 1 day')::timestamp
    from end_of_month_series, params
    where row_counter + 1 <= number_payments
  ),
  combined_series as (
    select * from fortnightly_series where is_fortnightly
    union all
    select * from end_of_month_series
  ),
  numbered_payments as (
    select
      payment_date
      ,row_number() over (order by payment_date) as "number"
    from combined_series
    order by payment_date
  )
  select
    np.payment_date::timestamp as "date"
    ,extract(year from np.payment_date)::integer as "year"
    ,extract(month from np.payment_date)::integer as "month"
    ,np."number"::integer as "number"
  from numbered_payments np
  limit number_payments;
end;
$$ language plpgsql;
