// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {createErrorNotification, createNotification} from '../../helpers/notifications';
import ACTION_TYPES from '../../const/action_types';
import Config from '../../config/main';
import ERRORS from '../../const/errors';
import NOTIFICATIONS from '../../const/notifications';
import {Observable} from 'rxjs/Observable';
import UsersActions from '../actions/users';
import {combineEpics} from 'redux-observable';
import {createRequestHeader} from '../../helpers/header';

const getUsers = (action$) => action$
    .ofType(ACTION_TYPES.USERS.GET_USERS)
    .switchMap((action) =>
        Observable.ajax
            .get(Config.API.ROUTES.USERS.GET_USERS, createRequestHeader(action.token))
            .map((res) => UsersActions.getUsersSuccess({users: res.response.users}))
            .catch(createErrorNotification(ERRORS.CODES.GET_USERS_ERROR, ERRORS.TYPES.USERS))
    );

const setUserRole = (action$) => action$
    .ofType(ACTION_TYPES.USERS.SET_USER_ROLE)
    .switchMap((action) =>
        Observable.ajax
            .put(Config.API.ROUTES.USERS.SET_USER_ROLE, action.data, createRequestHeader(action.token))
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(UsersActions.setUserRoleSuccess({user: res.response.user})),
                    createNotification(ACTION_TYPES.SESSION.SIGN_IN_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Updated'))
            )
            .catch(createErrorNotification(ERRORS.CODES.SET_USER_ROLE_ERROR, ERRORS.TYPES.USERS))
    );

export default combineEpics(
    getUsers,
    setUserRole
);
