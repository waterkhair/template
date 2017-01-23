// Modules
import Config from '../config/main';
import Joi from 'joi';

const updateSettingsSchema = Joi.object({
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

export default {
    updateSettingsSchema
};
