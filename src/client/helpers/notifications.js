// Modules
import 'rxjs/add/observable/of';
import ACTION_TYPES from '../const/action_types';
import Config from '../config/main';
import {Observable} from 'rxjs/Observable';

const addNotification = (code, group, message) =>
    Observable.of({
        code,
        group,
        message,
        milliseconds: Config.NOTIFICATIONS.MILLISECONDS,
        type: ACTION_TYPES.NOTIFICATIONS.ADD_NOTIFICATION
    });

export default {
    addNotification
};
