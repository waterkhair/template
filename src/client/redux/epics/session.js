// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import actions from '../actions/session';
import {combineEpics} from 'redux-observable';

const logIn = (action$) => action$
    .ofType(actions.ACTION_TYPE.LOG_IN)
        .switchMap((action) => {
            Observable.ajax
                .post(`${window.config.apiUrl}/auth/local/login'`, {
                    password: action.password,
                    username: action.username
                }, {
                    'Content-Type': 'application/json'
                })
                .map(actions.logInSuccess)
                .catch((error) => {
                    throw error;
                });
        }),
    logOut = (action$) => action$
        .ofType(actions.ACTION_TYPE.LOG_OUT)
        .switchMap(() => {
            Observable.ajax
                .get(`${window.config.apiUrl}/auth/logout`, {
                    'Content-Type': 'application/json'
                })
                .map(actions.logOutSuccess)
                .catch((error) => {
                    throw error;
                });
        }),
    registerUser = (action$) => action$
        .ofType(actions.ACTION_TYPE.REGISTER_USER)
        .switchMap((action) => {
            Observable.ajax
                .post(`${window.config.apiUrl}/auth/local`, {
                    displayName: action.displayName,
                    email: action.email,
                    password: action.password,
                    username: action.username
                }, {
                    'Content-Type': 'application/json'
                })
                .map(actions.registerUserSuccess)
                .catch((error) => {
                    throw error;
                });
        });

export default combineEpics(
    logIn,
    logOut,
    registerUser
);
