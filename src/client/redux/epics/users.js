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

export default combineEpics(
    getUsers
);
