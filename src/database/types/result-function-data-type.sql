--drop type public.result_function_data_type;
create type public.result_function_data_type as (
  inserted_id integer,
  success boolean,
  message text
);