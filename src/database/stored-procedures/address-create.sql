CREATE OR REPLACE FUNCTION catalog.address_create(
  IN associate_id integer,
  IN city_id integer,
  IN street VARCHAR(50),
  IN settlement VARCHAR(50),
  IN town VARCHAR(50),
  IN postal_code VARCHAR(6),
  IN phone VARCHAR(10),
  IN mobile VARCHAR(10),
  IN email VARCHAR(50),
  OUT success BOOLEAN,
  OUT message TEXT
)
RETURNS RECORD AS $$
DECLARE
BEGIN
  success := FALSE;
  message := 'Operación no inciada.';

  IF street IS NULL OR street = '' THEN
    success := FALSE;
    message := 'La calle es requerida.';
    RETURN;
  ELSEIF settlement IS NULL OR settlement = '' THEN
    success := FALSE;
    message := 'La colonia es requerida.';
    RETURN;
  ELSEIF town IS NULL OR town = '' THEN
    success := FALSE;
    message := 'La localidad es requerida.';
    RETURN;
  ELSEIF postal_code IS NULL OR postal_code = '' THEN
    success := FALSE;
    message := 'El código postal es requerido.';
    RETURN;
  ELSEIF NOT validate_postal_code(postal_code) THEN
    success := FALSE;
    message := 'El código postal no es válido.'
    RETURN;
  ELSEIF phone IS NULL OR phone = '' THEN
    success := FALSE;
    message := 'El teléfono es requerido.';
    RETURN;
  ELSEIF NOT validate_phone(phone) THEN
    success := FALSE;
    message := 'El teléfono no es válido.';
    RETURN;
  ELSEIF mobile IS NULL OR mobile = '' THEN
    success := FALSE;
    message := 'El celular es requerido.';
    RETURN;
  ELSEIF email IS NULL OR email = '' THEN
    success := FALSE;
    message := 'El email es requerido.';
    RETURN;
  ELSEIF NOT validate_email(email) THEN
    success := FALSE;
    message := 'El email no es válido.';
    RETURN;
  ELSEIF associate_id = 0 THEN
    success := FALSE;
    message := 'El socio ligado a la localización no es válido.';
    RETURN;
  ELSEIF city_id = 0 THEN
    success := FALSE;
    message := 'La ciudad ligada a la localización no es válida.';
    RETURN;
  END IF;

  IF NOT EXISTS(
    SELECT 1 FROM catalog.associate WHERE A.id = associate_create.associate_id
  ) THEN
    success := FALSE;
    message := 'El asociado no existe en el sistema.';
    RETURN;
  END IF;

  IF NOT EXISTS(
    SELECT 1 FROM catalog.city WHERE A.id = associate_create.city_id
  ) THEN
    success := FALSE;
    message := 'La ciudad no existe en el sistema.';
    RETURN;
  END IF;

  BEGIN
    INSERT INTO catalog.address
    (associate_id, city_id, street, settlement, town, postal_code, phone, mobile, email)
    VALUES (
      associate_id
      ,city_id
      ,UPPER(street)
      ,UPPER(settlement)
      ,UPPER(town)
      ,UPPER(postal_code)
      ,UPPER(phone)
      ,UPPER(mobile)
      ,UPPER(email)
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