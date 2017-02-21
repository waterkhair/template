// Routes configuration
module.exports = {
    SESSION: {
        LOGIN: '/session/sign-in'
    },
    SETTINGS: {
        GET_SETTINGS: '/session/settings',
        UPDATE_SETTINGS: '/session/settings'
    },
    USERS: {
        CREATE_USER: '/session/sign-up',
        DELETE_USER: '/session/close-account',
        GET_USERS: '/session/users',
        SET_USER_ROLE: '/session/user-role',
        UPDATE_USER: '/session/profile'
    }
};
