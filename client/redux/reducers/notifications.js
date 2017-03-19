// Modules
import {FIRST_INDEX, NEXT_INDEX} from '../../const/utils';
import ACTION_TYPES from '../../const/action_types';

/**
 * Creates the initial notifications redux state
 * @return {object} Returns initial notifications redux state
 */
const getInitialState = () => Object.assign({}, {
    notifications: []
});

export default (state = getInitialState(), action) => {
    switch (action.type) {
    case ACTION_TYPES.NOTIFICATIONS.ADD_NOTIFICATION: {
        return {
            ...state,
            notifications: [
                ...state.notifications, {
                    code: action.code,
                    group: action.group,
                    message: action.message,
                    milliseconds: action.milliseconds
                }
            ]
        };
    }
    case ACTION_TYPES.NOTIFICATIONS.CLEAR_NOTIFICATION: {
        return {
            ...state,
            notifications: getInitialState().notifications
        };
    }
    case ACTION_TYPES.NOTIFICATIONS.REMOVE_NOTIFICATION: {
        let index = 0;

        for (let iteration = 0; iteration < state.notifications; iteration++) {
            if (state.notifications[iteration].code === action.code) {
                index = iteration;
                break;
            }
        }

        return {
            ...state,
            notifications: [
                ...state.notifications.slice(FIRST_INDEX, index),
                ...state.notifications.slice(FIRST_INDEX + NEXT_INDEX)
            ]
        };
    }
    default:
        return state;
    }
};
