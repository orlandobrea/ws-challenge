#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL


CREATE TABLE task (
  id character varying(40) NOT NULL,
  name character varying(100) NOT NULL,
  done boolean
);

EOSQL
