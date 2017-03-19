// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {createErrorNotification, createNotification} from '../../helpers/notifications';
import ACTION_TYPES from '../../const/action_types';
import ERRORS from '../../const/errors';
import NOTIFICATIONS from '../../const/notifications';
import {Observable} from 'rxjs/Observable';
import UsersActions from '../actions/users';
import {combineEpics} from 'redux-observable';
import {createRequestHeaders} from '../../helpers/headers';

/**
 * Epic handler for getting all Users
 * @param {Observable} action$ - Observable action
 * @return {Observable} Returns an Observable action
 */
const getUsers = (action$) => action$
    .ofType(ACTION_TYPES.USERS.GET_USERS)
    .switchMap((action) =>
        Observable.ajax
            .get(window.config.API.ROUTES.USERS.GET_USERS, createRequestHeaders(action.token))
            .map((res) => UsersActions.getUsersSuccess(res.response.payload))
            .catch(createErrorNotification(ERRORS.CODES.GET_USERS_ERROR, ERRORS.TYPES.USERS))
    );

/**
 * Epic handler for setting a User's Role
 * @param {Observable} action$ - Observable action
 * @return {Observable} Returns an Observable action
 */
const setUserRole = (action$) => action$
    .ofType(ACTION_TYPES.USERS.SET_USER_ROLE)
    .switchMap((action) =>
        Observable.ajax
            .put(`${window.config.API.ROUTES.USERS.SET_USER_ROLE}/${action.username}`, action.data, createRequestHeaders(action.token))
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(UsersActions.setUserRoleSuccess(res.response.payload)),
                    createNotification(ACTION_TYPES.SESSION.SIGN_IN_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'User role updated'))
            )
            .catch(createErrorNotification(ERRORS.CODES.SET_USER_ROLE_ERROR, ERRORS.TYPES.USERS))
    );

export default combineEpics(
    getUsers,
    setUserRole
);
