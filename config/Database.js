import * as dotenv from 'dotenv'
dotenv.config();

import { Sequelize } from 'sequelize';

const db = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USERNAME, 
    process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres'
    });

export default db;
