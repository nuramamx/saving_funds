DROP TABLE IF EXISTS log.audit;

CREATE TABLE IF NOT EXISTS log.audit
(
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  previous_data JSONB NOT NULL,
  new_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT audit_id_pkey PRIMARY KEY (id),
  CONSTRAINT audit_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES security.user (id)
);