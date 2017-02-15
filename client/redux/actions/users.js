// Modules
import ACTION_TYPES from '../../const/action_types';
import {createAction} from '../../helpers/actions';

export default {
    getUsers: createAction(ACTION_TYPES.USERS.GET_USERS),
    getUsersSuccess: createAction(ACTION_TYPES.USERS.GET_USERS_SUCCESS),
    setUserRole: createAction(ACTION_TYPES.USERS.SET_USER_ROLE),
    setUserRoleSuccess: createAction(ACTION_TYPES.USERS.SET_USER_ROLE_SUCCESS)
};
