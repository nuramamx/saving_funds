do $$
declare
  column_exists boolean := false;
begin
  select
    true
  from information_schema.columns
  where table_schema = 'process'
  and table_name = 'payment'
  and column_name = 'is_active'
  into column_exists;

  if column_exists is false or column_exists is null then
    alter table process.payment
    add column is_active boolean default true;
  end if;
end $$;