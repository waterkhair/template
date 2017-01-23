// API configuration
const host = 'http://localhost:3000';

module.exports = {
    ROUTES: {
        SESSION: {
            GET_PROFILE: `${host}/session/get-profile`,
            GET_SETTINGS: `${host}/session/get-settings`,
            SIGN_IN: `${host}/session/sign-in`,
            SIGN_UP: `${host}/session/sign-up`,
            UPDATE_PROFILE: `${host}/session/update-profile`,
            UPDATE_SETTINGS: `${host}/session/update-settings`
        },
        USERS: {
            GET_USERS: `${host}/session/users`,
            SET_USER_ROLE: `${host}/session/set-user-role`
        }
    }
};
