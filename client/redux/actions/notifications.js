// Modules
import ACTION_TYPES from '../../const/action_types';
import {createAction} from '../../helpers/actions';

export default {
    clearNotifications: createAction(ACTION_TYPES.NOTIFICATIONS.CLEAR_NOTIFICATION),
    removeNotification: createAction(ACTION_TYPES.NOTIFICATIONS.REMOVE_NOTIFICATION)
};
