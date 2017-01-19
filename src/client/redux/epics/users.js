// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import ACTION_TYPES from '../../const/action_types';
import Config from '../../config/main';
import ERRORS from '../../const/errors';
import {Observable} from 'rxjs/Observable';
import UsersActions from '../actions/users';
import {combineEpics} from 'redux-observable';
import errorHelper from '../../helpers/error';

const getUsers = (action$) => action$
    .ofType(ACTION_TYPES.GET_USERS)
        .switchMap((action) =>
            Observable.ajax
                .get(Config.API.ROUTES.USERS.GET_USERS, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(UsersActions.getUsersSuccess)
                .catch((err) =>
                    errorHelper.ajaxErrorHandler(
                        ERRORS.CODES.GET_USERS_ERROR,
                        ERRORS.TYPES.USERS,
                        err.xhr,
                        Config.ERRORS.MILLISECONDS,
                        ACTION_TYPES.ADD_ERROR))
        );

const setUserRole = (action$) => action$
    .ofType(ACTION_TYPES.SET_USER_ROLE)
        .switchMap((action) =>
            Observable.ajax
                .put(Config.API.ROUTES.USERS.SET_USER_ROLE, {
                    admin: action.admin,
                    username: action.username
                }, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(UsersActions.setUserRoleSuccess)
                .catch((err) =>
                    errorHelper.ajaxErrorHandler(
                        ERRORS.CODES.SET_USER_ROLE_ERROR,
                        ERRORS.TYPES.USERS,
                        err.xhr,
                        Config.ERRORS.MILLISECONDS,
                        ACTION_TYPES.ADD_ERROR))
        );

export default combineEpics(
    getUsers,
    setUserRole
);
