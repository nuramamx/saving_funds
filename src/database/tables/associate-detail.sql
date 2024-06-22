DROP TABLE IF EXISTS catalog.associate_detail;

CREATE TABLE IF NOT EXISTS catalog.associate_detail
(
    id INT GENERATED ALWAYS AS IDENTITY,
    associate_id INT NOT NULL,
    agreement_id INT NOT NULL,
    dependency_key VARCHAR(10) NOT NULL,
    category VARCHAR(8) NOT NULL,
    salary NUMERIC(20,6) CONSTRAINT salary_positive CHECK (salary > 0) NOT NULL,
    social_contribution NUMERIC(20,6) CONSTRAINT social_contribution CHECK (social_contribution > 0) NOT NULL,
    fortnightly_contribution NUMERIC(20,6) CONSTRAINT fortnightly_contribution CHECK (fortnightly_contribution > 0) NOT NULL,
    request_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT associate_detail_pkey PRIMARY KEY (id),
    CONSTRAINT associate_detail_associate_id_key UNIQUE (associate_id),
    CONSTRAINT associate_detail_agreement_id_key UNIQUE (agreement_id),
    CONSTRAINT associate_detail_associate_id_fkey FOREIGN KEY (associate_id)
        REFERENCES catalog.associate (id)
);