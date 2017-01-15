// Modules
import Config from '../config/main';
import UsersHelper from '../helpers/users';

const GetUsersRoute = {
    config: {
        auth: {
            scope: ['admin'],
            strategy: 'jwt'
        },
        handler: UsersHelper.getUsers
    },
    method: 'GET',
    path: Config.ROUTES.USERS.GET_USERS_ROUTE
};

const SetUserRoleRoute = {
    config: {
        auth: {
            scope: ['admin'],
            strategy: 'jwt'
        },
        handler: UsersHelper.setUserRole
    },
    method: 'PUT',
    path: Config.ROUTES.USERS.SET_USER_ROLE_ROUTE
};

export default {
    GetUsersRoute,
    SetUserRoleRoute
};
