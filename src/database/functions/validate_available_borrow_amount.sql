CREATE OR REPLACE FUNCTION validate_available_borrow_amount(associate_id INT, requested_amount DECIMAL(20,6))
RETURNS BOOLEAN AS $$
BEGIN
  IF EXISTS(
    SELECT 1 FROM operation.savingfund SF WHERE SF.associate_id = associate_id AND SF.money_available > requested_amount
  ) THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql;