import bcrypt from 'bcryptjs';
import TransactionType from '../transaction/TransactionType.js';

import User from './UserModel.js';
import transactionService from '../transaction/TransactionService.js';

async function getAll() {
    return await User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function getByUsername(username) {

    const user = await User.findOne({ where: { username: username } });

    if (user === null) {
        throw 'user not found';
    }
    else {
        return user;
    }
}

async function create(params) {
    // validate
    if (await User.findOne({ where: { username: params.username } })) {
        throw `username ${params.username} already exist`;
    }

    const user = new User(params);

    // hash password
    user.password = await bcrypt.hash(params.password, 10);

    // create transaction record
    transactionService.create({ 
        type: TransactionType.Initial, 
        username: user.username, 
        amount: user.balance });

    // save user
    return await user.save();;
}

async function update(id, params) {
    const user = await getUser(id);

    // validate if username has changed, changed username must be unique 
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await User.findOne({ where: { username: params.username } })) {
        throw `username ${params.username} already exist`;
    }

    // hash password if it was entered
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    return await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw 'user not found';
    return user;
}

export default {
    getAll,
    getById,
    getByUsername,
    create,
    update,
    delete: _delete
};