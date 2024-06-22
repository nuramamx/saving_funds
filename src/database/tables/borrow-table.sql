DROP TABLE IF EXISTS process.borrow;

CREATE TABLE IF NOT EXISTS process.borrow
(
  id INT GENERATED ALWAYS AS IDENTITY,
  associate_id INT NOT NULL,
  requested_amount DECIMAL(20,6) NOT NULL,
  period SMALLINT NOT NULL,
  annual_rate DECIMAL(20,6) NOT NULL,
  is_fortnightly BOOLEAN NOT NULL,
  is_cleared BOOLEAN NOT NULL DEFAULT FALSE, 
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT borrow_pkey PRIMARY KEY (id),
  CONSTRAINT borrow_associate_id_key UNIQUE (associate_id),
  CONSTRAINT borrow_associate_id_fkey FOREIGN KEY (associate_id)
      REFERENCES catalog.associate (id)
);