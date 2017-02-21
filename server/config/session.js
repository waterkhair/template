// Session configuration
module.exports = {
    SALT_NUMBER: 10,
    SECRET_KEY: 'SECRET_KEY',
    SESESSION_ALGORITHM: 'HS256',
    SESESSION_EXPIRATION: '1h',
    USER: {
        USERNAME_MAX_CHARS: 30,
        USERNAME_MIN_CHARS: 2
    }
};
