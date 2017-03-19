// Modules
import 'rxjs/add/observable/of';
import ACTION_TYPES from '../const/action_types';
import {Observable} from 'rxjs/Observable';

/**
 * Creates an error notification handler
 * @param {string} code - Error code
 * @param {string} group - Error group
 * @return {function} Returns an error notification handler
 */
export const createErrorNotification = (code, group) => (err) =>
    Observable.of({
        code,
        group,
        message: err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : window.config.ERRORS.GENERAL_ERROR_MESSAGE,
        milliseconds: window.config.NOTIFICATIONS.MILLISECONDS,
        type: ACTION_TYPES.NOTIFICATIONS.ADD_NOTIFICATION
    });

/**
 * Creates a notification
 * @param {string} code - Notification code
 * @param {string} group - Notification group
 * @param {string} message - Notification message
 * @return {function} Returns a notification
 */
export const createNotification = (code, group, message) =>
    Observable.of({
        code,
        group,
        message,
        milliseconds: window.config.NOTIFICATIONS.MILLISECONDS,
        type: ACTION_TYPES.NOTIFICATIONS.ADD_NOTIFICATION
    });
