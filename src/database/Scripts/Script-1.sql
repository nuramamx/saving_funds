WITH RECURSIVE params AS (
    SELECT '2024-08-15'::timestamp AS start_date
),
fifteenth_series AS (
    -- Generate the 15th of each month starting from the initial date
    SELECT
        CASE 
            WHEN date_trunc('month', params.start_date) + INTERVAL '14 days' >= params.start_date 
              THEN date_trunc('month', params.start_date) + INTERVAL '14 days'
            ELSE date_trunc('month', params.start_date + INTERVAL '1 month') + INTERVAL '14 days'
        END AS payment_date
    from params
    UNION ALL
    SELECT
        date_trunc('month', payment_date + INTERVAL '1 month') + INTERVAL '14 days'
    FROM
        fifteenth_series, params
    WHERE
        payment_date + INTERVAL '1 day' < params.start_date::timestamp + INTERVAL '48 months'
),
end_of_month_series AS (
    -- Generate the last day of each month starting from the initial date
    SELECT
        (date_trunc('month', params.start_date::date) + INTERVAL '1 month - 1 day')::timestamp AS payment_date
    from params
    UNION ALL
    SELECT
        (date_trunc('month', payment_date + INTERVAL '1 day') + INTERVAL '1 month - 1 day')::timestamp
    FROM
        end_of_month_series, params
    WHERE
        payment_date + INTERVAL '1 month' < params.start_date::timestamp + INTERVAL '54 months'
),
combined_series AS (
    SELECT 1 as number_payment, * FROM fifteenth_series
    UNION ALL
    SELECT 2 as number_payment, * FROM end_of_month_series
)
select
  number_payment
  ,to_char(payment_date, 'YYYY-MM-dd') as payment_date
FROM
  combined_series
ORDER BY
  payment_date asc
  ,number_payment asc
limit 24;