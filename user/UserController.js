import express from 'express';
import Joi from 'joi';

import userService from './UserService.js';
import Role from './Role.js';
import validateRequest from '../middleware/RequestValidator.js';

// routes

const router = express.Router();

router.get('/', getUsers);
router.get('/id/:id', getUserById);
router.post('/', createUserSchema, createUser);
router.patch('/id/:id', updateUserSchema, updateUser);
router.delete('/id/:id', deleteUserSchema, deleteUser);

export default router;

// route functions

function getUsers(req, res, next) {
    try {
        userService.getAll()
            .then(users => res.status(200).json(users))
            .catch(next);
    } catch (error) {
        console.log(error.message);
    }
}

function getUserById(req, res, next) {

    try {
        userService.getById(req.params.id)
            .then(user => res.status(200).json(user))
            .catch(next);
    } catch (error) {
        console.log(error.message);
    }
}

function createUser(req, res, next) {
    try {
        userService.create(req.body)
            .then((user) => res.status(200).json(user))
            .catch(next);
    } catch (error) {
        console.log(error.message);
    }
}

function updateUser(req, res, next) {
    try {
        userService.update(req.params.id, req.body)
            .then((user) => res.status(200).json(user))
            .catch(next);
    } catch (error) {
        console.log(error.message);
    }
}

function deleteUser(req, res, next) {
    try {
        userService.delete(req.params.id)
            .then(() => res.status(200).json({ message: 'user deleted' }))
            .catch(next);
    } catch (error) {
        console.log(error.message);
    }
}

// schema functions

function createUserSchema(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().valid(Role.Admin).required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        balance: Joi.number().min(0).empty(0)
    });
    validateRequest(req, next, schema);
}

function updateUserSchema(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().valid(Role.Admin).required(),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty(''),
        balance: Joi.number().min(0).empty(0)
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}

function deleteUserSchema(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().valid(Role.Admin).required(),
    });
    validateRequest(req, next, schema);
}