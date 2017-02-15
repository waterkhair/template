// Modules
const Config = require('../config/main'),
    Joi = require('joi');

const updateSettingsSchema = Joi.object({
    theme: Joi
        .string()
        .required()
        .default('ligth')
        .description('Theme color schema (I.E. dark or ligth)'),
    username: Joi
        .string()
        .alphanum()
        .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
        .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
        .required()
        .description('Username (i.e. test)')
});

module.exports = {
    updateSettingsSchema
};
