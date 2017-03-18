// Modules
const Config = require('../config/main'),
    SessionHelper = require('../helpers/session'),
    SessionValidations = require('../validations/session');

// Route to handle login requests
const LoginRoute = {
    config: {
        handler: SessionHelper.login,
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        pre: [{
            assign: 'credentials',
            method: SessionHelper.verifyCredentials
        }],
        tags: [
            'api'
        ],
        validate: {
            payload: SessionValidations.login
        }
    },
    method: 'POST',
    path: Config.ROUTES.SESSION.LOGIN
};

module.exports = {
    LoginRoute
};
