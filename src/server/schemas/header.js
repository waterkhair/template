// Modules
import Joi from 'joi';

const authorizatedHeaderSchema = Joi.object({
    'authorization': Joi
        .string()
        .required(),
    'content-type': Joi
        .string()
        .required()
}).unknown();

const unauthorizatedHeaderSchema = Joi.object({
    'content-type': Joi
        .string()
        .required()
}).unknown();

export default {
    authorizatedHeaderSchema,
    unauthorizatedHeaderSchema
};
