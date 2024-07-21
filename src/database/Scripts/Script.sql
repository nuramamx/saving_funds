WITH RECURSIVE date_series AS (
    -- Base case: start date
    SELECT 
        '2023'::text as "year"
        ,'01'::text as "month"
        ,'2023-01-01'::timestamp as generated_date
    UNION ALL
    -- Recursive case: add 15 days to the last generated date
    SELECT 
        to_char((generated_date + INTERVAL '15 days'), 'YYYY')::text as "year"
        ,to_char((generated_date + INTERVAL '15 days'), 'MM')::text as "month"
        ,(generated_date + INTERVAL '15 days')::timestamp as generated_date
    FROM 
        date_series
    WHERE 
        generated_date + INTERVAL '15 days' <= '2023-12-31'  -- Replace with your end date condition
)
SELECT 
    "year"
  ,"month"
  ,"generated_date"
FROM 
    date_series;