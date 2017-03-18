// API configuration
const host = 'http://localhost:3000';

module.exports = {
    ROUTES: {
        SESSION: {
            LOGIN: `${host}/session`
        },
        SETTINGS: {
            GET_SETTINGS: `${host}/settings`,
            UPDATE_SETTINGS: `${host}/settings`
        },
        USERS: {
            CREATE_USER: `${host}/users/user`,
            DELETE_USER: '/users/user',
            GET_USERS: `${host}/users`,
            SET_USER_ROLE: `${host}/users/role`,
            UPDATE_USER: `${host}/users/user`
        }
    }
};
