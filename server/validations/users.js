// Modules
const Config = require('../config/main'),
    Joi = require('joi');

// Validates a user create schema
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

// Validates user's role set schema
const setUserRole = Joi.object({
    admin: Joi
        .boolean()
        .required()
        .description('Admin role (i.e. true or false)')
});

// Validates user update schema
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
        .description('User password (i.e. testpass)')
});

// Validates username param
const usernameParam = Joi.object({
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
    setUserRole,
    updateUser,
    usernameParam
};
