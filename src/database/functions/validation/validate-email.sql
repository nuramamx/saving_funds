CREATE OR REPLACE FUNCTION validate_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  IF email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql;