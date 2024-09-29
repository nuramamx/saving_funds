--drop function catalog.associate_detail_validate;
create or replace function "catalog".associate_detail_validate()
returns trigger as $$
declare
  v_agreement_id integer;
begin
  if not (tg_op = 'DELETE') then
    if (trim(new.detail->>'agreement') <> '') then
      v_agreement_id := (
        select
          ag.id
        from "system".agreement as ag
        where ag.name = upper(trim(new.detail->>'agreement'))
        limit 1
      );

      if v_agreement_id is not null then
        new.detail := jsonb_set(new.detail, '{agreementId}', to_jsonb(v_agreement_id))::jsonb;
      end if;
    end if;

    if new.detail->>'agreementId' is null or coalesce((new.detail->>'agreementId')::integer, 0) <= 0 then
      raise exception 'Especifique el convenio.';
    end if;

    if new.detail->>'dependencyKey' is null or trim(new.detail->>'dependencyKey') = '' then
      raise exception 'Especifique la clave de dependencia.';
    end if;

    if new.detail->>'category' is null or trim(new.detail->>'category') = '' then
      raise exception 'Especifique la categoría.';
    end if;

    if new.detail->>'salary' is null or (new.detail->>'salary')::numeric(20,2) <= 0 then
      raise exception 'El monto del salario/pensión debe ser mayor a 0.';
    end if;
  
    if new.detail->>'socialContribution' is null or (new.detail->>'socialContribution')::numeric(20,2) <= 0 then
      raise exception 'El monto de la aportación social debe ser mayor a 0.';
    end if;
  
    if new.detail->>'frequentContribution' is null or (new.detail->>'frequentContribution')::numeric(20,2) <= 0 then
      raise exception 'El monto de la aportación frecuente debe ser mayor a 0.';
    end if;

    if new.detail->>'requestDate' is null or not jsonb_typeof(new.detail->'requestDate') = 'string' or (new.detail->>'requestDate')::date is null then
      raise exception 'Especifique una fecha de solicitud válida.';
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

create or replace trigger associate_detail_trigger
before insert or update on "catalog".associate
for each row execute function "catalog".associate_detail_validate();