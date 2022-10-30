import express from 'express';
import cors from 'cors';

import UserController from './controllers/UserController.js';
import TransactionController from './controllers/TransactionController.js';

import errorHandler from './middleware/ErrorHandler.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// api routes
app.use('/users', UserController);
app.use('/trans', TransactionController);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.SERVER_ENV === 'development' ? process.env.SERVER_PORT_DEV : process.env.SERVER_PORT_PRO;
app.listen(port, () => console.log(`Server up and listening on port ${port}...`));