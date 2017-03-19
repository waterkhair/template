// Routes configuration
module.exports = {
    SESSION: {
        LOGIN: '/session'
    },
    SETTINGS: {
        GET_SETTINGS: '/settings',
        UPDATE_SETTINGS: '/settings'
    },
    USERS: {
        CREATE_USER: '/users/user',
        DELETE_USER: '/users/user/{username}',
        GET_USERS: '/users',
        SET_USER_ROLE: '/users/role',
        UPDATE_USER: '/users/user'
    }
};
