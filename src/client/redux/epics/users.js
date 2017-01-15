// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import ACTION_TYPES from '../../const/action_types';
import Config from '../../config/main';
import {Observable} from 'rxjs/Observable';
import actions from '../actions/users';
import {combineEpics} from 'redux-observable';

const getUsers = (action$) => action$
    .ofType(ACTION_TYPES.GET_USERS)
        .switchMap((action) =>
            Observable.ajax
                .get(Config.API.ROUTES.USERS.GET_USERS, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(actions.getUsersSuccess)
                .catch((error) => {
                    throw error;
                })
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
                .map(actions.setUserRoleSuccess)
                .catch((error) => {
                    throw error;
                })
        );

export default combineEpics(
    getUsers,
    setUserRole
);
