CREATE OR REPLACE FUNCTION process.borrow_create(
  IN associate_id INT,
  IN requested_amount DECIMAL(20,6),
  IN period SMALLINT,
  IN is_fortnightly BOOLEAN,
  OUT success BOOLEAN,
  OUT message TEXT
)
RETURNS RECORD AS $$
DECLARE
  annual_rate DECIMAL(20,6);
  borrow_requested_year SMALLINT;
BEGIN
  success := FALSE;
  message := 'Operación no iniciada.';

  IF associate_id = 0 THEN
    message := 'El socio ligado al préstamo no es válido.';
    RETURN;
  ELSEIF requested_amount <= 0 THEN
    message := 'El monto solicitado no puede ser de 0.';
    RETURN;
  ELSEIF period NOT IN (1,2,3) THEN
    message := 'El periodo no está en el rango requerido (1, 2, 3).';
    RETURN;
  END IF;

  -- Extract the year from requested borrow.
  SELECT EXTRACT(YEAR FROM requested_date) INTO borrow_requested_year;

  -- Check if associate has a not cleared borrow.
  IF NOT EXISTS(
    SELECT 1 FROM operation.borrow
    WHERE associate_id = associate_id
    AND borrow_requested_year IN (EXTRACT(YEAR FROM requested_date))
    AND is_cleared = FALSE
  ) THEN
    message := 'El socio tiene un préstamo no liquidado.';
  END IF;

  -- Get the annual rate based on period.
  SELECT AR.rate INTO annual_rate
  FROM config.annual_rates AR
  WHERE AR.period = period;

  BEGIN
    INSERT INTO operation.borrow (associate_id, requested_amount, period, annual_rate, is_fortnightly)
    VALUES (
      associate_id,
      requested_amount,
      period,
      annual_rate,
      is_fortnightly
    );

    success := TRUE;
    message := 'El préstamo se ha registrado con éxito.';
  EXCEPTION
    WHEN OTHERS THEN
      success := FALSE;
      message := 'Ocurrió un error al realizar la operación: ' || SQLERRM;
  END;
END;
$$ LANGUAGE plpgsql;