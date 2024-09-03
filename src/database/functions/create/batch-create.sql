--drop function administration.batch_create;
create or replace function "system".batch_create(
  in p_name varchar,
  in p_batch_function text,
  in p_details jsonb,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_name is null or p_name = '' then
    message := 'Debe especificar el nombre del batch.';
    return;
  elseif p_batch_function is null or p_batch_function = '' then
    message := 'Debe especificar la función del batch.';
    return;
  elseif p_batch_function is null then
    message := 'Debe especificar el detalle del batch.';
    return;
  end if;

  if exists (
    select 1 from "system".batch as b where b."name" = p_name
  ) then
    message := 'Ya existe un batch con el mismo nombre.';
    return;
  end if;

  begin
    insert into "system".batch("name", batch_function, details)
    values (
      p_name
      ,p_batch_function
      ,p_details
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
