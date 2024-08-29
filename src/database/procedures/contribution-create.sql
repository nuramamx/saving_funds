--drop function process.contribution_create;
create or replace function process.contribution_create(
  in p_saving_fund_id integer,
  in p_number integer,
  in p_contribution_amount numeric(20,2),
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_saving_fund_id <= 0 then
    message := 'El fondo de ahorro no tiene un identificador válido.';
    return;
  end if;

  if p_contribution_amount <= 0 then
    message := 'La aportación debe ser un monto mayor a 0.';
    return;
  end if;

  begin
    insert into process.contribution(saving_fund_id, "number", contribution_amount)
    values (
      p_saving_fund_id
      ,p_number
      ,p_contribution_amount
    )
    returning id into inserted_id;
  
    success := true;
    message := 'La aportación se ha registrado con éxito.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la operación: ' || SQLERRM;
  end;
end;
$$ language plpgsql;