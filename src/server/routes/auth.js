// Modules
import AuthHelper from '../helpers/auth';
import AuthSchemas from '../schemas/auth';
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
    path: Config.AUTH.GET_USERS_PATH
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
    path: Config.AUTH.SET_USER_ROLE_PATH
};

const SignInRoute = {
    config: {
        handler: AuthHelper.returnToken,
        pre: [{
            assign: 'user',
            method: AuthHelper.verifyCredentials
        }],
        validate: {
            payload: AuthSchemas.authenticateSchema
        }
    },
    method: 'POST',
    path: Config.AUTH.SIGN_IN_PATH
};

const SignUpRoute = {
    config: {
        handler: AuthHelper.registerUser,
        pre: [{
            method: AuthHelper.verifyUniqueUser
        }],
        validate: {
            payload: AuthSchemas.userSchema
        }
    },
    method: 'POST',
    path: Config.AUTH.SIGN_UP_PATH
};

export default {
    GetUsersRoute,
    SetUserRoleRoute,
    SignInRoute,
    SignUpRoute
};
