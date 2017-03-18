// Modules
const Config = require('../config/main'),
    Joi = require('joi');

// Validates login schema
const login = Joi.object({
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

module.exports = {
    login
};
