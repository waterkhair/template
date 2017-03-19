// Routes configuration
module.exports = {
    SESSION: {
        LOGIN: '/session'
    },
    SETTINGS: {
        GET_SETTINGS: '/settings/{username}',
        UPDATE_SETTINGS: '/settings/{username}'
    },
    USERS: {
        CREATE_USER: '/users/user',
        DELETE_USER: '/users/user/{username}',
        GET_USERS: '/users',
        SET_USER_ROLE: '/users/role/{username}',
        UPDATE_USER: '/users/user/{username}'
    }
};
