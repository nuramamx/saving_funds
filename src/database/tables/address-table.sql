DROP TABLE IF EXISTS catalog.address;

CREATE TABLE IF NOT EXISTS catalog.address
(
  id INT GENERATED ALWAYS AS IDENTITY,
  associate_id INT NOT NULL,
  city_id INT NOT NULL,
  street VARCHAR(50) NOT NULL,
  settlement VARCHAR(50) NOT NULL,
  town VARCHAR(50) NOT NULL,
  postal_code VARCHAR(6) NOT NULL CONSTRAINT postal_code_validate CHECK (LENGTH(postal_code) <> 10 AND LENGTH(postal_code) <> 13),
  phone VARCHAR(10) NOT NULL CONSTRAINT phone_validate CHECK (validate_phone(phone)),
  mobile VARCHAR(10) NOT NULL CONSTRAINT mobile_validate CHECK (validate_phone(mobile)),
  email VARCHAR(10) NOT NULL CONSTRAINT email_validate CHECK (validate_email(email)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT address_pkey PRIMARY KEY (id),
  CONSTRAINT address_associate_id_key UNIQUE (associate_id),
  CONSTRAINT address_associate_id_fkey FOREIGN KEY (associate_id)
    REFERENCES catalog.associate (id),
  CONSTRAINT address_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES catalog.city (id)
);