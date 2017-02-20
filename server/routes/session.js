// Modules
const Config = require('../config/main'),
    HeaderSchemas = require('../schemas/header'),
    SessionHelper = require('../helpers/session'),
    SessionSchemas = require('../schemas/session'),
    UsersSchemas = require('../schemas/users');

const CloseAccountRoute = {
    config: {
        auth: {
            scope: [
                'user',
                'admin'
            ],
            strategy: 'jwt'
        },
        handler: SessionHelper.closeAccount,
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
            payload: SessionSchemas.closeAccountSchema
        }
    },
    method: 'DELETE',
    path: Config.ROUTES.SESSION.CLOSE_ACCOUNT
};

const SignInRoute = {
    config: {
        handler: SessionHelper.getToken,
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
            payload: SessionSchemas.authenticateSchema
        }
    },
    method: 'POST',
    path: Config.ROUTES.SESSION.SIGN_IN
};

const SignUpRoute = {
    config: {
        handler: SessionHelper.registerUser,
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        pre: [{
            assign: 'user',
            method: SessionHelper.verifyUniqueUser
        }],
        tags: [
            'api'
        ],
        validate: {
            payload: UsersSchemas.createUserSchema
        }
    },
    method: 'POST',
    path: Config.ROUTES.SESSION.SIGN_UP
};

const UpdateProfileRoute = {
    config: {
        auth: {
            scope: [
                'user',
                'admin'
            ],
            strategy: 'jwt'
        },
        handler: SessionHelper.updateProfile,
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
            payload: UsersSchemas.updateUserSchema
        }
    },
    method: 'PUT',
    path: Config.ROUTES.SESSION.UPDATE_PROFILE
};

module.exports = {
    CloseAccountRoute,
    SignInRoute,
    SignUpRoute,
    UpdateProfileRoute
};
