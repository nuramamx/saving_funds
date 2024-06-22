CREATE OR REPLACE FUNCTION log.create_audit(
  IN user_id INT,
  IN previous_data JSONB,
  IN new_data JSONB,
  OUT success BOOLEAN,
  OUT message TEXT
)
RETURNS RECORD AS $$
DECLARE
BEGIN
  success := FALSE;
  message := 'Operación no iniciada.';

  BEGIN
    INSERT INTO audit(user_id, previous_data, new_data)
    VALUES (
      user_id,
      previous_data,
      new_data
    );

    success := TRUE;
    message := 'Se realizó la transacción satisfactoriamente.';
  EXCEPTION
    WHEN OTHERS THEN
      success := FALSE;
      message := 'Ocurrió un error al realizar la operación: ' || SQLERRM;
  END;
END;
$$ LANGUAGE plpgsql;