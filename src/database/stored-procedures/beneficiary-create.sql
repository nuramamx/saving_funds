CREATE OR REPLACE FUNCTION catalog.beneficiary_create(
  IN associate_id INT,
  IN beneficiaries JSONB,
  OUT success BOOLEAN,
  OUT message TEXT
)
RETURNS RECORD AS $$
DECLARE
  total_percentage_temp INT;
  total_percentage_actual INT;
  is_total_percentage_reached BOOLEAN := FALSE;
BEGIN
  success := FALSE;
  message := 'Operación no iniciada.';

  DROP TABLE IF EXISTS temp_beneficiaries;
  CREATE TEMPORARY TABLE temp_beneficiaries (
    name VARCHAR(50) NOT NULL,
    percentage INT NOT NULL
  );

  INSERT INTO temp_beneficiaries (name, percentage)
  SELECT 
    element ->> 'name' AS name
    ,(element ->> 'percentage')::INT AS percentage
  FROM LATERAL jsonb_array_elements(beneficiaries) AS element;

  SELECT SUM(B.percentage) INTO total_percentage_actual FROM catalog.beneficiary AS B WHERE B.associate_id = beneficiary_create.associate_id;
  SELECT COALESCE(SUM(percentage),0) INTO total_percentage_temp FROM temp_beneficiaries;

  -- Activate a flag when the percentage reached 100% in both places
  IF ((total_percentage_actual + total_percentage_temp)) = 100 THEN
    is_total_percentage_reached := TRUE;
  END IF;

  -- Check if the list have only 5 beneficiaries.
  IF 5 < (
    SELECT COUNT(1) FROM temp_beneficiaries
  ) THEN
    message := 'Solo se permiten hasta 5 beneficiarios.';
    RETURN;
  END IF;

  -- Check if exists 100% of assigned beneficiaries.
  IF EXISTS(
    SELECT 1 FROM catalog.beneficiary AS B WHERE B.associate_id = beneficiary_create.associate_id HAVING SUM(B.percentage) = 100
  ) THEN
    message := 'El socio ya cuenta con beneficiarios asignados al 100%.';
    RETURN;
  END IF;

  -- Check if the sum of existent beneficiaries and new beneficiaries is not over of 100%
  IF ((total_percentage_actual + total_percentage_temp) > 100) THEN
    message := 'Ya se ha alcanzado el límite de porcentaje de los beneficiarios, disminuya o elimine alguno.';
    RETURN;
  END IF;

  -- Check if the sum of existent beneficiaries and new beneficiaries is not minor of 100%
  IF ((total_percentage_actual + total_percentage_temp) < 100) THEN
    message := 'No se ha alcanzado el límite de porcentaje de los beneficiarios, aumente alguno.';
    RETURN;
  END IF;

  -- Check if name is not null or empty.
  IF EXISTS(
    SELECT 1 FROM temp_beneficiaries WHERE name = '' OR name = NULL
  ) THEN
    message := 'El nombre de alguno de los beneficiarios está vacío o es núlo.';
    RETURN;
  END IF;

  -- Check if percentage is not over 100%.
  IF (total_percentage_temp > 100 AND is_total_percentage_reached = FALSE) THEN
    message := 'El porcentaje total de los beneficiarios es superior al 100%.';
    RETURN;
  END IF;

   -- Check if percentage is not minor of 100%.
  IF (total_percentage_temp < 100 AND is_total_percentage_reached = FALSE) THEN
    message := 'El porcentaje total de los beneficiarios es inferior al 100%.';
    RETURN;
  END IF;

  BEGIN
    INSERT INTO catalog.beneficiary (associate_id, name, percentage)
    SELECT beneficiary_create.associate_id
      ,name
      ,percentage
    FROM temp_beneficiaries
    WHERE percentage <> 0
    OR (name is null or name = '');

    success := TRUE;
    message := 'Se registraron los beneficiarios correctamente.';
  EXCEPTION
    WHEN OTHERS THEN
      success := FALSE;
      message := 'Ocurrió un error al realizar la operación' || SQLERRM;
  END;
END;
$$ LANGUAGE plpgsql;