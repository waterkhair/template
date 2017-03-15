// Modules
import 'rxjs/add/observable/of';
import ACTION_TYPES from '../const/action_types';
import Config from '../config/main';
import {Observable} from 'rxjs/Observable';

export const createErrorNotification = (code, group) => (err) =>
    Observable.of({
        code,
        group,
        message: err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE,
        milliseconds: Config.NOTIFICATIONS.MILLISECONDS,
        type: ACTION_TYPES.NOTIFICATIONS.ADD_NOTIFICATION
    });

export const createNotification = (code, group, message) =>
    Observable.of({
        code,
        group,
        message,
        milliseconds: Config.NOTIFICATIONS.MILLISECONDS,
        type: ACTION_TYPES.NOTIFICATIONS.ADD_NOTIFICATION
    });
