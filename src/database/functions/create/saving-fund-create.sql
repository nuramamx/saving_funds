--drop function process.savind_fund_create;
create or replace function process.savind_fund_create(
  in p_associate_id integer,
  in p_opening_balance numeric(20,6),
  in p_is_fortnigthly boolean,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_annual_rate decimal(20,6);
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_associate_id <= 0 then
    message := 'El asociado no tiene un identificador válido.';
    return;
  end if;

  if p_opening_balance <= 0 then
    message := 'La aportación inicial debe ser un monto mayor a 0.';
    return;
  end if;

  select AR.rate into v_annual_rate
  from administration.saving_fund_annual_rate as AR
  where AR."year" = extract(year from current_date);

  begin
    insert into process.saving_fund(associate_id, opening_balance, annual_rate, is_fortnightly)
    values (
      p_associate_id
      ,p_opening_balance
      ,v_annual_rate
      ,p_is_fortnightly
    )
    returning id into inserted_id;

    insert into process.contribution(saving_fund_id, amount)
    values (
      inserted_id
      ,p_opening_balance
    );
  
    success := true;
    message := 'El fondo de ahorro se ha registrado con éxito.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la operación: ' || SQLERRM;
  end;
end;
$$ language plpgsql;