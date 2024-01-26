# ToDo App


## Execute

### Using docker 

In project root folder execute `docker-compose up`

### Without docker 

- Install PostgreSQL
- Check that postgreSQL is started and running on port 5432
- Create the task table in PostgreSQL 
```
CREATE TABLE task (
  id character varying(40) NOT NULL,
  name character varying(100) NOT NULL,
  done boolean
);
```
- Install backend (NestJS) dependencies
- `npm i`
- Start backend `DB_HOST=localhost DB_USERNAME=<postgreSQL user> DB_PASSWORD=<postgreSQL password> npm run start:dev`

