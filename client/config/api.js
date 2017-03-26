// API configuration
const host = 'http://localhost:3000';

module.exports = {
    ROUTES: {
        ROLE: `${host}/role`,
        SESSION: {
            LOGIN: `${host}/session`,
            LOGOUT: `${host}/logout`
        },
        SETTINGS: `${host}/settings`,
        USER: `${host}/user`
    }
};
