CREATE OR REPLACE FUNCTION validate_postal_code(postal_code TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  IF postal_code ~ '^\d{5}$' THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql;