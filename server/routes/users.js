// Modules
const Config = require('../config/main'),
    HeaderSchemas = require('../schemas/header'),
    UsersHelper = require('../helpers/users'),
    UsersSchemas = require('../schemas/users');

const GetUsersRoute = {
    config: {
        auth: {
            scope: [
                'admin'
            ],
            strategy: 'jwt'
        },
        handler: UsersHelper.getUsers,
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
    path: Config.ROUTES.USERS.GET_USERS
};

const SetUserRoleRoute = {
    config: {
        auth: {
            scope: [
                'admin'
            ],
            strategy: 'jwt'
        },
        handler: UsersHelper.setUserRole,
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
            payload: UsersSchemas.setUserRoleSchema
        }
    },
    method: 'PUT',
    path: Config.ROUTES.USERS.SET_USER_ROLE
};

module.exports = {
    GetUsersRoute,
    SetUserRoleRoute
};
