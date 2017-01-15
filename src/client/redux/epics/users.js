// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import ACTION_TYPES from '../../const/action_types';
import {Observable} from 'rxjs/Observable';
import actions from '../actions/users';
import {combineEpics} from 'redux-observable';

const getUsers = (action$) => action$
    .ofType(ACTION_TYPES.GET_USERS)
        .switchMap((action) => {
            const getUsersUrl = `${window.config.API.HOST}/auth/users`;

            return Observable.ajax
                .get(getUsersUrl, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(actions.getUsersSuccess)
                .catch((error) => {
                    throw error;
                });
        });

const setUserRole = (action$) => action$
    .ofType(ACTION_TYPES.SET_USER_ROLE)
        .switchMap((action) => {
            const setUserRoleUrl = `${window.config.API.HOST}/auth/set-user-role`;

            return Observable.ajax
                .put(setUserRoleUrl, {
                    admin: action.admin,
                    username: action.username
                }, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(actions.setUserRoleSuccess)
                .catch((error) => {
                    throw error;
                });
        });

export default combineEpics(
    getUsers,
    setUserRole
);
