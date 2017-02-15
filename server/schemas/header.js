// Modules
const Joi = require('joi');

const authorizatedHeaderSchema = Joi.object({
    'authorization': Joi
        .string()
        .required()
        .description('Authentication token (i.e. Bearer {token})')
        .default('Bearer ')
}).unknown();

module.exports = {
    authorizatedHeaderSchema
};
