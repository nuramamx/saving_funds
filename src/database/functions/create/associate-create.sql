--drop function catalog.associate_create;
create or replace function catalog.associate_create(
  in p_name varchar(100),
  in p_rfc varchar(13),
  in p_gender char(1),
  in p_detail jsonb,
  in p_address jsonb,
  in p_workplace jsonb,
  in p_beneficiaries jsonb,
  in p_is_active boolean = true,
  out inserted_id integer,
  out success boolean,
  out message text
)
returns RECORD as $$
declare
  v_saving_fund_success boolean;
  v_saving_fund_message text;
begin
  success := false;
  message := 'Operación no iniciada.';

  if p_name is null or p_name = '' then
    message := 'El nombre es requerido.';
    return;
  elseif p_rfc is null or p_rfc = '' then
    message := 'El R.F.C. es requerido.';
    return;
  elseif length(p_rfc) <> 10 and length(p_rfc) <> 12 and length(p_rfc) <> 13 then
    message := 'El R.F.C. debe tener 10, 12 o 13 caracteres.';
    return;
  elseif p_gender is null or p_gender = '' then
    message := 'El género es requerido.';
    return;
  elseif p_gender not in ('M', 'F') then
    message := 'El género debe ser "M" (Masculino) o "F" (Femenino).';
    return;
  elseif p_detail is null then
    message := 'El detalle es requerido.';
    return;
  elseif p_address is null then
    message := 'La localización es requerida.';
    return;
  elseif p_workplace is null then
    message := 'El centro de trabajo es requerido.';
    return;
  elseif p_beneficiaries is null then
    message := 'Los beneficiarios son requeridos.';
    return;
  end if;

  if exists(
    select 1 from "catalog".associate as a where a.rfc = p_rfc
  ) then
    message := 'El R.F.C. ya se encuentra registrado.';
    return;
  end if;

  begin
    insert into "catalog".associate ("name", rfc, gender, detail, address, workplace, beneficiaries, is_active)
    values (
      upper(trim(p_name))
      ,upper(trim(p_rfc))
      ,upper(p_gender)
      ,p_detail
      ,p_address
      ,p_workplace
      ,p_beneficiaries
      ,p_is_active
    )
    returning id into inserted_id;

    select
      sf.success
      ,sf.message
    into
      v_saving_fund_success
      ,v_saving_fund_message
    from
      process.savind_fund_create(inserted_id, (p_detail->>'socialContribution')::numeric(20,6), true) as sf;

    if v_saving_fund_success = false then
      raise exception 'Error en fondo de ahorro: %', v_saving_fund_message;
    end if;

    success := true;
    message := 'Se realizó la transacción satisfactoriamente.';
  exception
    when others then
      success := false;
      message := 'Ocurrió un error al realizar la transacción: ' || sqlerrm;
  end;
end;
$$ language plpgsql;