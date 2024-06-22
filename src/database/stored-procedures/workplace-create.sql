CREATE OR REPLACE FUNCTION catalog.workplace_create(
  IN associate_id integer,
  IN key VARCHAR(5),
  IN name VARCHAR(50),
  IN phone VARCHAR(10),
  OUT success BOOLEAN,
  OUT message TEXT
)
RETURNS RECORD AS $$
DECLARE
BEGIN
  success := FALSE;
  message := 'Operación no inciada.';

  IF key IS NULL OR key = '' THEN
    success := FALSE;
    message := 'La clave del centro de trabajo es requerida.';
    RETURN;
  ELSEIF name IS NULL OR name = '' THEN
    success := FALSE;
    message := 'El nombre del centro de trabajo es requerido.';
    RETURN;
  ELSEIF phone IS NULL OR phone = '' THEN
    success := FALSE;
    message := 'El teléfono del centro de trabajo es requerido.';
    RETURN;
  ELSEIF NOT validate_phone(phone) THEN
    success := FALSE;
    message := 'El teléfono no es válido.';
    RETURN;
  ELSEIF associate_id = 0 THEN
    success := FALSE;
    message := 'El asociado ligado al centro de trabajo no es válido.';
    RETURN;
  END IF;

  IF NOT EXISTS(
    SELECT 1 FROM catalog.associate A WHERE A.id = associate_create.associate_id
  ) THEN
    success := FALSE;
    message := 'El asociado no existe en el sistema.';
    RETURN;
  END IF;

  BEGIN
    INSERT INTO catalog.workplace (associate_id, key, name, phone)
    VALUES (
      associate_id
      ,UPPER(key)
      ,UPPER(name)
      ,UPPER(phone)
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