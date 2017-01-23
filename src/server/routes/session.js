// Modules
import Config from '../config/main';
import SessionHelper from '../helpers/session';
import SessionSchemas from '../schemas/session';
import UsersSchemas from '../schemas/users';

const SignInRoute = {
    config: {
        handler: SessionHelper.getToken,
        pre: [{
            assign: 'credentials',
            method: SessionHelper.verifyCredentials
        }],
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
        pre: [{
            assign: 'user',
            method: SessionHelper.verifyUniqueUser
        }],
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
            scope: ['user', 'admin'],
            strategy: 'jwt'
        },
        handler: SessionHelper.updateProfile,
        pre: [{
            method: SessionHelper.verifySession
        }],
        validate: {
            payload: UsersSchemas.updateUserSchema
        }
    },
    method: 'PUT',
    path: Config.ROUTES.SESSION.UPDATE_PROFILE
};

export default {
    SignInRoute,
    SignUpRoute,
    UpdateProfileRoute
};
