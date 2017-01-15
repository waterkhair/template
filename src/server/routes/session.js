// Modules
import AuthHelper from '../helpers/session';
import AuthSchemas from '../schemas/session';
import Config from '../config/main';

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
    path: Config.ROUTES.SESSION.SIGN_IN
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
    path: Config.ROUTES.SESSION.SIGN_UP
};

const UpdateProfileRoute = {
    config: {
        handler: AuthHelper.updateProfile,
        validate: {
            payload: AuthSchemas.profileSchema
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
