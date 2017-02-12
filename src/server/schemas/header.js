// Modules
import Joi from 'joi';

const authorizatedHeaderSchema = Joi.object({
    'authorization': Joi
        .string()
        .required()
        .description('Authentication token (i.e. Bearer {token})')
        .default('Bearer ')
}).unknown();

export default {
    authorizatedHeaderSchema
};
