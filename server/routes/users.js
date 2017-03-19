// Modules
const Config = require('../config/main'),
    HeadersValidations = require('../validations/header'),
    UsersHelper = require('../helpers/users'),
    UsersValidations = require('../validations/users');

// Route to handle requests to create a user
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

// Route to handle requests to delete a user
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
            params: UsersValidations.usernameParam
        }
    },
    method: 'DELETE',
    path: Config.ROUTES.USERS.DELETE_USER
};

// Route to handle requests to get the current user's role
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

// Route to handle requests to set a user's role
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
            params: UsersValidations.usernameParam,
            payload: UsersValidations.setUserRole
        }
    },
    method: 'PUT',
    path: Config.ROUTES.USERS.SET_USER_ROLE
};

// Route to handle requests to update a user
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
            params: UsersValidations.usernameParam,
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
