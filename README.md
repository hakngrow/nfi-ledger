## NFI Ledger - Deposit & Withdraw APIs

### 1. Setup and Config

1.1 The NFI Ledger requires a [PostgresSQL](https://www.postgresql.org/) RDBMS.  

1.2 Create a database in the RDBMS.

1.3 Furnish the database connection and server settings in the `.env` file.

### 2. Project Structure

![Project Structure](/public/images/project_structure.jpg)

The project is structured into feature folders (i.e. `user` and `transactions`) and non-feature shared component folders (i.e. `middleware` and `config`).  

The `middleware` folder contains middleware functions that perform error handling and request validation.

The `config` folder contains functions that loads config settings from the `.env` file and initializes the `Sequelize` ORM module.

Each feature (i.e. `user` and `transactions`) consists of the model, service and controller modules.

The `Sequelize` model is an abstraction that represents a table in the database. In the model, we define the name of the table in the database and which columns it has (and their data types).

The service module contains functions that execute the feature.

The controller module contains route mappings and request validation schemas.

## 3. REST APIs

The following are the requested APIs in Postman documentation: 

[Register new user](https://documenter.getpostman.com/view/13967603/2s8YRducS3#6f65d61b-099e-4910-ade8-02cd3fbc644a)

[Deposit](https://documenter.getpostman.com/view/13967603/2s8YRducS3#e53af743-6317-4a91-ab76-f3a8c620fb02)

[Withdraw](https://documenter.getpostman.com/view/13967603/2s8YRducS3#199cd0d1-0611-4168-bd25-d96aeadbca46)