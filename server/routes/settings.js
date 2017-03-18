// Modules
const Config = require('../config/main'),
    HeadersValidations = require('../validations/header'),
    SettingsHelper = require('../helpers/settings'),
    SettingsValidations = require('../validations/settings');

// Route to handle requests to get the settings of the current user
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
            headers: HeadersValidations.authorization
        }
    },
    method: 'GET',
    path: Config.ROUTES.SETTINGS.GET_SETTINGS
};

// Route to handle requests to update the settings of the current user 
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
            headers: HeadersValidations.authorization,
            payload: SettingsValidations.updateSettings
        }
    },
    method: 'PUT',
    path: Config.ROUTES.SETTINGS.UPDATE_SETTINGS
};

module.exports = {
    GetSettingsRoute,
    UpdateSettingsRoute
};
