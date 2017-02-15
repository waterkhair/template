// API configuration
const host = 'http://localhost:3000';

module.exports = {
    ROUTES: {
        SESSION: {
            GET_SETTINGS: `${host}/session/settings`,
            SIGN_IN: `${host}/session/sign-in`,
            SIGN_UP: `${host}/session/sign-up`,
            UPDATE_PROFILE: `${host}/session/profile`,
            UPDATE_SETTINGS: `${host}/session/settings`
        },
        USERS: {
            GET_USERS: `${host}/session/users`,
            SET_USER_ROLE: `${host}/session/user-role`
        }
    }
};
