// Modules
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import actions from '../actions/session';

const logIn = (action$) => action$
    .ofType(actions.ACTION_TYPE.LOG_IN)
    .switchMap((action) => {
        return Observable.ajax
            .post(
                window.config.apiUrl + '/auth/local/login',
                {
                    username: action.username,
                    password: action.password
                },
                { 'Content-Type': 'application/json' })
            .map(actions.logInSuccess)
            .catch((error) => {
                console.error(error);
            });
    });

const logOut = (action$) => action$
    .ofType(actions.ACTION_TYPE.LOG_OUT)
    .switchMap(() => {
        return Observable.ajax
            .get(
                window.config.apiUrl + '/auth/logout',
                { 'Content-Type': 'application/json' })
            .map(actions.logOutSuccess)
            .catch((error) => {
                console.error(error);
            });
    });

const registerUser = (action$) => action$
    .ofType(actions.ACTION_TYPE.REGISTER_USER)
    .switchMap((action) => {
        return Observable.ajax
            .post(
                window.config.apiUrl + '/auth/local',
                {
                    username: action.username,
                    password: action.password,
                    email: action.email,
                    displayName: action.displayName
                },
                { 'Content-Type': 'application/json' })
            .map(actions.registerUserSuccess)
            .catch((error) => {
                console.error(error);
            });
    });

export default combineEpics(
    logIn,
    logOut,
    registerUser
);
