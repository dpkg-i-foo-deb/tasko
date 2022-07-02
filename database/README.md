# What is this directory used for?

This directory contains the models and script to create the database

# What am I supposed to do with this?

You need to create a new database and user using PostgreSQL and use the provided script to create the tables

`CREATE DATABASE database-name;`

`CREATE USER user-name WITH ENCRYPTED PASSWORD 'ultra-secret-password'`

`GRANT ALL PRIVILEGES ON DATABASE database-name TO user-name`

Run the script using either the terminal or some tool

# Database ER model

![alt text](/database/er-model.png)

# Database model (Using PgAdmin4)

![alt text](/database/erd-model.png)
