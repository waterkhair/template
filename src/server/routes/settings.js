// Modules
import Config from '../config/main';
import HeaderSchemas from '../schemas/header';
import SettingsHelper from '../helpers/settings';
import SettingsSchemas from '../schemas/settings';

const GetSettingsRoute = {
    config: {
        auth: {
            scope: [
                'user',
                'admin'
            ],
            strategy: 'jwt'
        },
        handler: SettingsHelper.getSettings,
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        tags: [
            'api'
        ],
        validate: {
            headers: HeaderSchemas.authorizatedHeaderSchema
        }
    },
    method: 'GET',
    path: Config.ROUTES.SESSION.GET_SETTINGS
};

const UpdateSettingsRoute = {
    config: {
        auth: {
            scope: [
                'user',
                'admin'
            ],
            strategy: 'jwt'
        },
        handler: SettingsHelper.updateSettings,
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        tags: [
            'api'
        ],
        validate: {
            headers: HeaderSchemas.authorizatedHeaderSchema,
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
