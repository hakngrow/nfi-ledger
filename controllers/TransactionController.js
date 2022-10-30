import express from 'express';

import transactionService from '../services/TransactionService.js';
import TransactionType from '../helpers/TransactionType.js';

// routes

const router = express.Router();

router.get('/username/:username', getTransactionsByUsername);

export default router;

// route functions

function getTransactionsByUsername(req, res, next) {

    try {
        transactionService.getByUsername(req.params.username)
            .then(transactions => res.status(200).json(transactions))
            .catch(next);
    } catch (error) {
        console.log(error.message);
    }
}

function createTransaction(req, res, next) {
    try {
        transactionService.create(req.body)
            .then((transaction) => res.status(200).json(transaction))
            .catch(next);
    } catch (error) {
        console.log(error.message);
    }
}
