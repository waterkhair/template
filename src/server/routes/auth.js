// Modules
import AuthHelper from '../helpers/auth';
import AuthSchemas from '../schemas/auth';
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
    path: Config.ROUTES.AUTH.SIGN_IN_PATH
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
    path: Config.ROUTES.AUTH.SIGN_UP_PATH
};

export default {
    SignInRoute,
    SignUpRoute
};
