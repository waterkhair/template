// Modules
import Config from '../config/main';
import SessionHelper from '../helpers/session';
import SessionSchemas from '../schemas/session';
import SettingsHelper from '../helpers/settings';
import SettingsSchemas from '../schemas/settings';

const GetSettingsRoute = {
    config: {
        auth: {
            scope: ['user', 'admin'],
            strategy: 'jwt'
        },
        handler: SettingsHelper.getSettings,
        pre: [{
            method: SessionHelper.verifySession
        }],
        validate: {
            payload: SessionSchemas.sessionSchema
        }
    },
    method: 'POST',
    path: Config.ROUTES.SESSION.GET_SETTINGS
};

const UpdateSettingsRoute = {
    config: {
        auth: {
            scope: ['user', 'admin'],
            strategy: 'jwt'
        },
        handler: SettingsHelper.updateSettings,
        pre: [{
            method: SessionHelper.verifySession
        }],
        validate: {
            payload: SettingsSchemas.updateSettingsSchema
        }
    },
    method: 'PUT',
    path: Config.ROUTES.SESSION.UPDATE_SETTINGS
};

export default {
    GetSettingsRoute,
    UpdateSettingsRoute
};
