CREATE OR REPLACE FUNCTION catalog.associate_create(
  IN firstname VARCHAR(25),
  IN middlename VARCHAR(25),
  IN paternal_lastname VARCHAR(25),
  IN maternal_lastname VARCHAR(25),
  IN rfc VARCHAR(13),
  IN gender CHAR(1),
  OUT success BOOLEAN,
  OUT message TEXT
)
RETURNS RECORD AS $$
DECLARE
BEGIN
  success := FALSE;
  message := 'Operación no inciada.';

  IF firstname IS NULL OR firstname = '' THEN
    success := FALSE;
    message := 'El primer nombre es requerido.';
    RETURN;
  ELSEIF paternal_lastname IS NULL OR paternal_lastname = '' THEN
    success := FALSE;
    message := 'El apellido paterno es requerido.';
    RETURN;
  ELSEIF maternal_lastname IS NULL OR maternal_lastname = '' THEN
    success := FALSE;
    message := 'El apellido materno es requerido.';
    RETURN;
  ELSEIF rfc IS NULL OR rfc = '' THEN
    success := FALSE;
    message := 'El R.F.C. es requerido.';
    RETURN;
  ELSEIF LENGTH(rfc) <> 10 AND LENGTH(rfc) <> 13 THEN
    success := FALSE;
    message := 'El R.F.C. debe tener 10 o 13 caracteres.';
    RETURN;
  ELSEIF gender IS NULL OR gender = '' THEN
    success := FALSE;
    message := 'El género es requerido.';
    RETURN;
  ELSEIF gender NOT IN ('M', 'F') THEN
    success := FALSE;
    message := 'El género debe ser "M" (Masculino) o "F" (Femenino).';
    RETURN;
  END IF;

  IF EXISTS(
    SELECT 1 FROM catalog.associate A WHERE A.rfc = associate_create.rfc
  ) THEN
    success := FALSE;
    message := 'El R.F.C. ya se encuentra registrado.';
    RETURN;
  END IF;

  BEGIN
    INSERT INTO catalog.associate (rfc, gender, name)
    VALUES (
      UPPER(rfc)
      ,UPPER(gender)
      ,jsonb_build_object(
        'firstname', UPPER(firstname),
        'middlename', UPPER(middlename),
        'paternal_lastname', UPPER(paternal_lastname),
        'maternal_lastname', UPPER(maternal_lastname)
      )
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