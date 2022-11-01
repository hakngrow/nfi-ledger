import Transaction from './TransactionModel.js';

import userService from '../user/UserService.js';

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

async function deleteAll() {
    await Transaction.destroyAll();
}

async function deposit(params) {

    // retrieve user balance
    const user = await userService.getByUsername(params.username);

    user.balance += params.amount;

    // update user balance
    const updated = await userService.update(user.id, { balance: user.balance });

    // create transaction log
    const transaction = new Transaction(params);
    await transaction.save();

    return updated;
}

async function withdraw(params) {
    // retrieve user balance
    const user = await userService.getByUsername(params.username);

    if (user.balance + params.amount < 0) {
        throw `withdraw amount exceeds available balance`;
    }

    user.balance += params.amount;

    // update user balance
    const updated = await userService.update(user.id, { balance: user.balance });

    // create transaction log
    const transaction = new Transaction(params);
    await transaction.save();

    return updated;
}

export default {
    getByUsername,
    create,
    deposit,
    withdraw
};