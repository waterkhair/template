// Modules
const Joi = require('joi');

// Validates settings update schema
const updateSettings = Joi.object({
    theme: Joi
        .string()
        .required()
        .default('ligth')
        .description('Theme color schema (I.E. dark or ligth)')
});

module.exports = {
    updateSettings
};
