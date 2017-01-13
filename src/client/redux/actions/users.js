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

export default {
    getUsers,
    getUsersSuccess
};
