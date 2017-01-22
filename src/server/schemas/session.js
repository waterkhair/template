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

const profileSchema = Joi.object({
    email: Joi
        .string()
        .email(),
    name: Joi
        .string(),
    password: Joi
        .string(),
    username: Joi
        .string()
        .alphanum()
        .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
        .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
        .required()
});

const settingsSchema = Joi.object({
    theme: Joi
        .string()
        .required(),
    username: Joi
        .string()
        .alphanum()
        .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
        .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
        .required()
});

const userSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),
    name: Joi
        .string()
        .required(),
    password: Joi
        .string()
        .required(),
    username: Joi
        .string()
        .alphanum()
        .min(Config.SESSION.USER.USERNAME_MIN_CHARS)
        .max(Config.SESSION.USER.USERNAME_MAX_CHARS)
        .required()
});

export default {
    authenticateSchema,
    profileSchema,
    settingsSchema,
    userSchema
};
