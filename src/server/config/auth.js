// Auth configuration
module.exports = {
    GET_USERS_PATH: '/auth/users',
    SALT_NUMBER: 10,
    SECRET_KEY: 'SECRET_KEY',
    SIGN_IN_PATH: '/auth/sign-in',
    SIGN_UP_PATH: '/auth/sign-up',
    USER: {
        USERNAME_MAX_CHARS: 30,
        USERNAME_MIN_CHARS: 2
    }
};
