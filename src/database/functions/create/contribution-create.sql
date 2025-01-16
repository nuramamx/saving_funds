--drop function process.contribution_create;
create or replace function process.contribution_create(
  in p_saving_fund_id integer,
  in p_amount numeric,
  in p_applied_at timestamp with time zone,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_server_datetime timestamp with time zone;
begin
  success := false;
  message := 'Operación no iniciada.';

  v_server_datetime := (p_applied_at::date + current_time::time);

  begin
    insert into process.contribution(saving_fund_id, amount, applied_at)
    values (
      p_saving_fund_id      
      ,p_amount
      ,v_server_datetime
    ) returning id into inserted_id;

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrión un error al realizar la transacción: ' || sqlerrm;
  end;
end;
$$ language plpgsql;
