// Modules
const Joi = require('joi');

// Validates HTTP header schema
const authorization = Joi.object({
    'authorization': Joi
        .string()
        .required()
        .description('Authentication token (i.e. Bearer {token})')
        .default('Bearer ')
}).unknown();

module.exports = {
    authorization
};
