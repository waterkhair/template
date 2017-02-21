// Modules
const Config = require('../config/main'),
    HeadersValidations = require('../validations/header'),
    UsersHelper = require('../helpers/users'),
    UsersValidations = require('../validations/users');

const CreateUserRoute = {
    config: {
        handler: UsersHelper.createUser,
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        pre: [{
            assign: 'user',
            method: UsersHelper.verifyUniqueUser
        }],
        tags: [
            'api'
        ],
        validate: {
            payload: UsersValidations.createUser
        }
    },
    method: 'POST',
    path: Config.ROUTES.USERS.CREATE_USER
};

const DeleteUserRoute = {
    config: {
        auth: {
            scope: [
                'user',
                'admin'
            ],
            strategy: 'jwt'
        },
        handler: UsersHelper.deleteUser,
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
            payload: UsersValidations.deleteUser
        }
    },
    method: 'DELETE',
    path: Config.ROUTES.USERS.DELETE_USER
};

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
            headers: HeadersValidations.authorization
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
            headers: HeadersValidations.authorization,
            payload: UsersValidations.setUserRole
        }
    },
    method: 'PUT',
    path: Config.ROUTES.USERS.SET_USER_ROLE
};

const UpdateUserRoute = {
    config: {
        auth: {
            scope: [
                'user',
                'admin'
            ],
            strategy: 'jwt'
        },
        handler: UsersHelper.updateUser,
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
            payload: UsersValidations.updateUser
        }
    },
    method: 'PUT',
    path: Config.ROUTES.USERS.UPDATE_USER
};

module.exports = {
    CreateUserRoute,
    DeleteUserRoute,
    GetUsersRoute,
    SetUserRoleRoute,
    UpdateUserRoute
};
