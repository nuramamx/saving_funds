WITH RECURSIVE params AS (
        SELECT current_date AS initial_date
    ),
    fifteenth_series AS (
        -- Generate the 15th of each month starting from the initial date
        SELECT
            1 AS payment_number,
            CASE 
                WHEN date_trunc('month', initial_date) + INTERVAL '14 days' > initial_date 
                THEN date_trunc('month', initial_date) + INTERVAL '14 days'
                ELSE date_trunc('month', initial_date + INTERVAL '1 month') + INTERVAL '14 days'
            END AS payment_date
        FROM params
        UNION ALL
        SELECT
            payment_number + 2,
            date_trunc('month', payment_date + INTERVAL '1 month') + INTERVAL '14 days'
        FROM fifteenth_series, params
        WHERE payment_number + 2 <= 72
    ),
    end_of_month_series AS (
        -- Generate the last day of each month starting from the initial date
        SELECT
            2 AS payment_number,
            (date_trunc('month', initial_date) + INTERVAL '1 month - 1 day')::timestamp AS payment_date
        FROM params
        UNION ALL
        SELECT
            payment_number + 2,
            (date_trunc('month', payment_date + INTERVAL '1 day') + INTERVAL '1 month - 1 day')::timestamp
        FROM end_of_month_series, params
        WHERE payment_number + 2 <= 72
    ),
    combined_series AS (
        SELECT payment_number, payment_date FROM fifteenth_series
        UNION ALL
        SELECT payment_number, payment_date FROM end_of_month_series
    ),
    numbered_payments AS (
        SELECT
            payment_date
            ,row_number() over (order by payment_date) as payment_number
        FROM
            combined_series
        ORDER BY
            payment_date
    )
    SELECT
        extract(year from payment_date) as payment_year
        ,extract(month from payment_date) as payment_month
        ,payment_number
    FROM
        numbered_payments
    LIMIT 72;