import Transaction from '../models/TransactionModel.js';

async function getAll() {
    return await Transaction.findAll();
}

async function getByUsername(username) {
    return await Transaction.findAll({where: {username: username}});
}

async function create(params) {
    const transaction = new Transaction(params);
    return await transaction.save();
}

export default {
    getByUsername,
    create
};