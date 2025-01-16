--drop function process.contribution_batch;
create or replace function process.contribution_batch(
  in p_associate_name text,
  in p_amount numeric,
  in p_applied_at timestamp with time zone,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_saving_fund_id integer;
  v_server_datetime timestamp with time zone;
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_amount <= 0 then
    message := 'El monto de la aportación debe ser mayor a cero.';
    return;
  end if;

  v_server_datetime := (p_applied_at::date + current_time::time);
  v_saving_fund_id := (
    select
      s.id
    from process.saving_fund as s
    join "catalog".associate as a on s.associate_id = a.id
    where public.name_deconstruct(a."name") = p_associate_name
  );

  if v_saving_fund_id <= 0 or v_saving_fund_id is null then
    message := 'Socio no fue localizado.';
    return;
  end if;

  begin
    insert into process.contribution(saving_fund_id, amount, applied_at)
    values (
      v_saving_fund_id      
      ,p_amount
      ,v_server_datetime
    );

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrión un error al realizar la transacción: ' || sqlerrm;
  end;
end;
$$ language plpgsql;
