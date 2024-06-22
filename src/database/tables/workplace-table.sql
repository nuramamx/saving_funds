DROP TABLE IF EXISTS catalog.workplace;

CREATE TABLE IF NOT EXISTS catalog.workplace
(
    id INT GENERATED ALWAYS AS IDENTITY,
    associate_id INT NOT NULL,
    key VARCHAR(5) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT workplace_pkey PRIMARY KEY (id),
    CONSTRAINT workplace_associate_id_key UNIQUE (associate_id),
    CONSTRAINT workplace_associate_id_fkey FOREIGN KEY (associate_id)
        REFERENCES catalog.associate (id)
);