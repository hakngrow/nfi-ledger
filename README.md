## NFI Ledger - Deposit & Withdraw APIs

### 1. Setup and Config

1.1 The NFI Ledger requires a [PostgresSQL](https://www.postgresql.org/) RDBMS.  

1.2 Create a database in the RDBMS.

1.3 Furnish the database connection and server settings in the `.env` file.

### 2. Project Structure

![Project Structure](/public/images/project_structure.jpg)

The project is structured into feature folders (i.e. `user` and `transactions`) and non-feature folders (i.e. `middleware` and `config`)