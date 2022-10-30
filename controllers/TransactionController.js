import express from 'express';
import Joi from 'joi';

import transactionService from '../services/TransactionService.js';
import TransactionType from '../helpers/TransactionType.js';
import validateRequest from '../middleware/RequestValidator.js';

// routes

const router = express.Router();

router.get('/username/:username', getTransactionsByUsername);
router.post('/', createTransactionSchema, createTransaction);
router.post('/deposit', depositSchema, deposit);

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

function deposit(req, res, next) {
    try {
        transactionService.deposit(req.body)
            .then((transaction) => res.status(200).json(transaction))
            .catch(next);
    } catch (error) {
        console.log(error.message);
    }
}

function withdraw(req, res, next) {
    try {
        transactionService.withdraw(req.body)
            .then((transaction) => res.status(200).json(transaction))
            .catch(next);
    } catch (error) {
        console.log(error.message);
    }
}

// schema functions

function createTransactionSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string().valid(TransactionType.Deposit, TransactionType.Withdraw).required(),
        username: Joi.string().required(),
        amount: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function depositSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string().valid(TransactionType.Deposit).required(),
        username: Joi.string().required(),
        amount: Joi.number().positive()
    });
    validateRequest(req, next, schema);
}

function withdrawSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string().valid(TransactionType.Withdraw).required(),
        username: Joi.string().required(),
        amount: Joi.number().negative()
    });
    validateRequest(req, next, schema);
}
