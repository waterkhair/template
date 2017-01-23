// Modules
import Config from '../config/main';
import SettingsHelper from '../helpers/settings';
import SettingsSchemas from '../schemas/settings';

const GetSettingsRoute = {
    config: {
        auth: {
            scope: ['user', 'admin'],
            strategy: 'jwt'
        },
        handler: SettingsHelper.getSettings
    },
    method: 'GET',
    path: Config.ROUTES.SESSION.GET_SETTINGS
};

const UpdateSettingsRoute = {
    config: {
        auth: {
            scope: ['user', 'admin'],
            strategy: 'jwt'
        },
        handler: SettingsHelper.updateSettings,
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
