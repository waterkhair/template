// Modules
const Config = require('../config/main'),
    Joi = require('joi');

const createUserSchema = Joi.object({
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

const setUserRoleSchema = Joi.object({
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

const updateUserSchema = Joi.object({
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
    createUserSchema,
    setUserRoleSchema,
    updateUserSchema
};
