--drop function number_to_words;
create or replace function number_to_words(p_amount numeric)
  returns text as $$
declare
  v_integer_part bigint;
  v_decimal_part integer;
  v_words text;
  v_money_text text;
begin
  -- Extract integer and decimal parts
  v_integer_part := trunc(p_amount);
  v_decimal_part := round((p_amount - v_integer_part) * 100);

  -- Convert integer part to words (with the monetary context for "UN")
  v_words := convert_integer_to_words(v_integer_part, true);

  -- If integer part is greater than 1,000,000 so...
  v_money_text := case when v_integer_part >= 1000000 then ' DE PESOS ' ELSE ' PESOS ' END;

  -- Append "PESOS" and the decimal part (e.g., "25/100 M.N.")
  return upper(v_words) || v_money_text || lpad(v_decimal_part::text, 2, '0') || '/100 M.N.';
end;
$$ language plpgsql;
