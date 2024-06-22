DROP TABLE IF EXISTS catalog.beneficiary;

CREATE TABLE IF NOT EXISTS catalog.beneficiary
(
    id INT GENERATED ALWAYS AS IDENTITY,
    associate_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    percentage INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT beneficiary_pkey PRIMARY KEY (id),
    CONSTRAINT beneficiary_associate_id_fkey FOREIGN KEY (associate_id)
        REFERENCES catalog.associate (id)
);