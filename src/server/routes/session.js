// Modules
import Config from '../config/main';
import SessionHelper from '../helpers/session';
import SessionSchemas from '../schemas/session';

const SignInRoute = {
    config: {
        handler: SessionHelper.returnToken,
        pre: [{
            assign: 'user',
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
            payload: SessionSchemas.userSchema
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
            method: SessionHelper.verifyProfileSession
        }],
        validate: {
            payload: SessionSchemas.profileSchema
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
