// Modules
import Config from '../config/main';
import Joi from 'joi';

const authenticateSchema = Joi
    .alternatives()
    .try(
        Joi.object({
            password: Joi
                .string()
                .required(),
            username: Joi
                .string()
                .alphanum()
                .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
                .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
                .required()
        }),
        Joi.object({
            password: Joi
                .string()
                .required(),
            username: Joi
                .string()
                .email()
                .required()
        }));

const sessionSchema = Joi.object({
    username: Joi
        .string()
        .alphanum()
        .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
        .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
        .required()
});

export default {
    authenticateSchema,
    sessionSchema
};
