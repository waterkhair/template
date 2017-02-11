// Modules
import Config from '../config/main';
import UsersHelper from '../helpers/users';
import UsersSchemas from '../schemas/users';

const GetUsersRoute = {
    config: {
        auth: {
            scope: ['admin'],
            strategy: 'jwt'
        },
        handler: UsersHelper.getUsers
    },
    method: 'GET',
    path: Config.ROUTES.USERS.GET_USERS
};

const SetUserRoleRoute = {
    config: {
        auth: {
            scope: ['admin'],
            strategy: 'jwt'
        },
        handler: UsersHelper.setUserRole,
        validate: {
            payload: UsersSchemas.setUserRoleSchema
        }
    },
    method: 'PUT',
    path: Config.ROUTES.USERS.SET_USER_ROLE
};

export default {
    GetUsersRoute,
    SetUserRoleRoute
};
