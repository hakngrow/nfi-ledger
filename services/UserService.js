import bcrypt from 'bcryptjs';

import User from '../models/UserModel.js';

async function getAll() {
    return await User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await User.findOne({ where: { username: params.username } })) {
        throw 'username "' + params.username + '" is already registered';
    }

    const user = new User(params);

    // hash password
    user.password = await bcrypt.hash(params.password, 10);

    // save user
    return await user.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // validate if username has changed, changed username must be unique 
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await User.findOne({ where: { username: params.username } })) {
        throw 'username "' + params.username + '" is already exist';
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
    create,
    update,
    delete: _delete
};