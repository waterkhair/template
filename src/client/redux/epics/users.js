// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import ACTION_TYPES from '../../const/action_types';
import Config from '../../config/main';
import ERRORS from '../../const/errors';
import NOTIFICATIONS from '../../const/notifications';
import {Observable} from 'rxjs/Observable';
import UsersActions from '../actions/users';
import {combineEpics} from 'redux-observable';
import notificationsHelper from '../../helpers/notifications';

const getUsers = (action$) => action$
    .ofType(ACTION_TYPES.USERS.GET_USERS)
    .switchMap((action) =>
        Observable.ajax
            .get(Config.API.ROUTES.USERS.GET_USERS, {
                'Authorization': `Bearer ${action.token}`,
                'Content-Type': 'application/json'
            })
            .map(UsersActions.getUsersSuccess)
            .catch((err) => {
                const message = err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE;

                return notificationsHelper.addNotification(
                    ERRORS.CODES.GET_USERS_ERROR,
                    ERRORS.TYPES.USERS,
                    message);
            })
    );

const setUserRole = (action$) => action$
    .ofType(ACTION_TYPES.USERS.SET_USER_ROLE)
    .switchMap((action) =>
        Observable.ajax
            .put(Config.API.ROUTES.USERS.SET_USER_ROLE, {
                admin: action.admin,
                username: action.username
            }, {
                'Authorization': `Bearer ${action.token}`,
                'Content-Type': 'application/json'
            })
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(UsersActions.setUserRoleSuccess(res)),
                    notificationsHelper.addNotification(
                        ACTION_TYPES.SESSION.SIGN_IN_SUCCESS,
                        NOTIFICATIONS.TYPES.SESSION,
                        'Updated'))
            )
            .catch((err) => {
                const message = err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE;

                return notificationsHelper.addNotification(
                    ERRORS.CODES.SET_USER_ROLE_ERROR,
                    ERRORS.TYPES.USERS,
                    message);
            })
    );

export default combineEpics(
    getUsers,
    setUserRole
);
