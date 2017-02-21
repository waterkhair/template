// Modules
const Config = require('../config/main'),
    Joi = require('joi');

const createUser = Joi.object({
    email: Joi
        .string()
        .email()
        .required()
        .description('Email address (i.e. test@test.com)'),
    name: Joi
        .string()
        .required()
        .description('User full name (i.e. Test User)'),
    password: Joi
        .string()
        .required()
        .description('User password (i.e. testpass)'),
    username: Joi
        .string()
        .alphanum()
        .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
        .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
        .required()
        .description('Username (i.e. test)')
});

const deleteUser = Joi.object({
    username: Joi
        .string()
        .alphanum()
        .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
        .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
        .required()
        .description('Username (i.e. test)')
});

const setUserRole = Joi.object({
    admin: Joi
        .boolean()
        .required()
        .description('Admin role (i.e. true or false)'),
    username: Joi
        .string()
        .alphanum()
        .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
        .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
        .required()
        .description('Username (i.e. test)')
});

const updateUser = Joi.object({
    email: Joi
        .string()
        .email()
        .description('Email address (i.e. test@test.com)'),
    name: Joi
        .string()
        .description('User full name (i.e. Test User)'),
    password: Joi
        .string()
        .description('User password (i.e. testpass)'),
    username: Joi
        .string()
        .alphanum()
        .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
        .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
        .required()
        .description('Username (i.e. test)')
});

module.exports = {
    createUser,
    deleteUser,
    setUserRole,
    updateUser
};
