CREATE OR REPLACE FUNCTION catalog.associate_search_by_name(
  IN fullname VARCHAR(100)
)
RETURNS TABLE (
  id integer,
  firstname TEXT,
  paternal_lastname TEXT,
  maternal_lastname TEXT,
  full_address TEXT,
  agreement_name VARCHAR(50)
) AS $$
DECLARE
BEGIN
  RETURN QUERY
  SELECT
    A.id
    ,REPLACE(A.name->>'firstname', '"', '') AS firstname
    ,REPLACE(A.name->>'paternal_lastname', '"', '') AS paternal_lastname
    ,REPLACE(A.name->>'maternal_lastname', '"', '') AS maternal_lastname
    ,(ADDR.street || ', ' || ADDR.settlement || ', ' || ADDR.postal_code || ', ' || CI.name) AS full_address
    ,AG.name AS agreement_name
  FROM catalog.associate A
  JOIN catalog.associate_detail AD
    ON AD.associate_id = A.id
  JOIN catalog.address ADDR
    ON ADDR.associate_id = A.id
  JOIN catalog.agreement AG
    ON AG.id = AD.agreement_id
  JOIN catalog.city CI
    ON CI.id = ADDR.city_id
  WHERE 
    (A.name->>'firstname') || ' ' ||
    (A.name->>'paternalLastname') || ' ' ||
    (A.name->>'maternalLastname') LIKE '%' || UPPER(fullname) || '%';
END;
$$ LANGUAGE plpgsql;