--drop function log.create_audit;
create or replace function "log".create_audit(
  in p_user_id int,
  in p_previous_data jsonb,
  in p_new_data jsonb,
  out success boolean,
  out message text
)
returns record as $$
declare
begin
  success := false;
  message := 'operación no iniciada.';

  begin
    insert into "log".audit(user_id, previous_data, new_data)
    values (
      p_user_id,
      p_previous_data,
      p_new_data
    );

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'ocurrió un error al realizar la transacción: ' || sqlerrm;
  end;
end;
$$ language plpgsql;