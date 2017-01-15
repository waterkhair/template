// Mmdules
import ACTION_TYPES from '../../const/action_types';

const getUsers = (token) => ({
    token,
    type: ACTION_TYPES.GET_USERS
});

const getUsersSuccess = (res) => ({
    type: ACTION_TYPES.GET_USERS_SUCCESS,
    users: res.response.users
});

const setUserRole = (username, admin, token) => ({
    admin,
    token,
    type: ACTION_TYPES.SET_USER_ROLE,
    username
});

const setUserRoleSuccess = (res) => ({
    type: ACTION_TYPES.SET_USER_ROLE_SUCCESS,
    user: res.response.user
});

export default {
    getUsers,
    getUsersSuccess,
    setUserRole,
    setUserRoleSuccess
};
