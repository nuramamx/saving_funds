create or replace function convert_integer_to_words(n bigint, is_monetary boolean default false)
returns text as $$
declare
  result text := '';
begin
  -- Handle zero
  if n = 0 then
    return 'cero';
  end if;

  -- Handle millions
  if n >= 1000000 then
    if n >= 1000000 and n < 2000000 then
      result := 'un millón';
    else
      result := convert_integer_to_words(n / 1000000, false) || ' millones';
    end if;
    n := n % 1000000;
  end if;

  -- Handle thousands
  if n >= 1000 then
    if n >= 1000 and n < 2000 then
      result := result || ' mil';
    else
      result := result || ' ' || convert_integer_to_words(n / 1000, false) || ' mil';
    end if;
    n := n % 1000;
  end if;

  -- Handle hundreds
  if n >= 100 then
    if n = 100 then
      result := result || ' cien';
    elsif n > 100 and n < 200 then
      result := result || ' ciento';
    elsif n >= 200 and n < 300 then
      result := result || ' doscientos';
    elsif n >= 300 and n < 400 then
      result := result || ' trescientos';
    elsif n >= 400 and n < 500 then
      result := result || ' cuatrocientos';
    elsif n >= 500 and n < 600 then
      result := result || ' quinientos';
    elsif n >= 600 and n < 700 then
      result := result || ' seiscientos';
    elsif n >= 700 and n < 800 then
      result := result || ' setecientos';
    elsif n >= 800 and n < 900 then
      result := result || ' ochocientos';
    elsif n >= 900 and n < 1000 then
      result := result || ' novecientos';
    end if;
    n := n % 100;
  end if;

  -- Handle tens and teens
  if n >= 20 then
    if n >= 90 then
      result := result || ' noventa';
    elsif n >= 80 then
      result := result || ' ochenta';
    elsif n >= 70 then
      result := result || ' setenta';
    elsif n >= 60 then
      result := result || ' sesenta';
    elsif n >= 50 then
      result := result || ' cincuenta';
    elsif n >= 40 then
      result := result || ' cuarenta';
    elsif n >= 30 then
      result := result || ' treinta';
    elsif n >= 20 then
      result := result || ' veinte';
    end if;
    if n % 10 != 0 then
      result := result || ' y ' || convert_integer_to_words(n % 10, is_monetary);
    end if;
    n := 0;
  elsif n >= 10 then
    if n = 10 then
      result := result || ' diez';
    elsif n = 11 then
      result := result || ' once';
    elsif n = 12 then
      result := result || ' doce';
    elsif n = 13 then
      result := result || ' trece';
    elsif n = 14 then
      result := result || ' catorce';
    elsif n = 15 then
      result := result || ' quince';
    elsif n = 16 then
      result := result || ' dieciséis';
    elsif n = 17 then
      result := result || ' diecisiete';
    elsif n = 18 then
      result := result || ' dieciocho';
    elsif n = 19 then
      result := result || ' diecinueve';
    end if;
    n := 0;
  end if;

  -- Handle units
  if n > 0 then
    if n = 1 and is_monetary then
      result := result || ' un';
    elsif n = 1 then
      result := result || ' uno';
    elsif n = 2 then
      result := result || ' dos';
    elsif n = 3 then
      result := result || ' tres';
    elsif n = 4 then
      result := result || ' cuatro';
    elsif n = 5 then
      result := result || ' cinco';
    elsif n = 6 then
      result := result || ' seis';
    elsif n = 7 then
      result := result || ' siete';
    elsif n = 8 then
      result := result || ' ocho';
    elsif n = 9 then
      result := result || ' nueve';
    end if;
  end if;

  return trim(result);
end;
$$ language plpgsql;
