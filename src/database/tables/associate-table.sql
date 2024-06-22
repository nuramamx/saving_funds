DROP TABLE IF EXISTS catalog.associate;

CREATE TABLE IF NOT EXISTS catalog.associate
(
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    name JSONB NOT NULL,
    rfc VARCHAR(13) NOT NULL,
    gender CHAR(1) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT associate_pkey PRIMARY KEY (id),
    CONSTRAINT associate_rfc_key UNIQUE (rfc)
);