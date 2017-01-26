// Modules
import ACTION_TYPES from '../../const/action_types';

const addNotification = (code, group, message, milliseconds) => ({
    code,
    group,
    message,
    milliseconds,
    type: ACTION_TYPES.NOTIFICATIONS.ADD_NOTIFICATION
});

const clearNotifications = () => ({
    type: ACTION_TYPES.NOTIFICATIONS.CLEAR_NOTIFICATION
});

const removeNotification = (code) => ({
    code,
    type: ACTION_TYPES.NOTIFICATIONS.REMOVE_NOTIFICATION
});

export default {
    addNotification,
    clearNotifications,
    removeNotification
};
