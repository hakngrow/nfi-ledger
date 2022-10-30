import Transaction from '../models/TransactionModel.js';

import userService from './UserService.js';

async function getAll() {
    return await Transaction.findAll();
}

async function getByUsername(username) {
    return await Transaction.findAll({ where: { username: username } });
}

async function create(params) {
    const transaction = new Transaction(params);
    await transaction.save();
}

async function deposit(params) {

    // retrieve user balance
    const user = await userService.getByUsername(params.username);

    user.balance += params.amount;

    // update user balance
    await userService.update(user.id, { balance: user.balance });

    // create transaction log
    const transaction = new Transaction(params);
    return await transaction.save();
}

export default {
    getByUsername,
    create,
    deposit
};