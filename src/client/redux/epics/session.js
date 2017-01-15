// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import ACTION_TYPES from '../../const/action_types';
import {Observable} from 'rxjs/Observable';
import actions from '../actions/session';
import {combineEpics} from 'redux-observable';

const signIn = (action$) => action$
    .ofType(ACTION_TYPES.SIGN_IN)
        .switchMap((action) => {
            const signInUrl = `${window.config.API.HOST}/session/sign-in`;

            return Observable.ajax
                .post(signInUrl, {
                    password: action.password,
                    username: action.username
                }, {
                    'Content-Type': 'application/json'
                })
                .map(actions.signInSuccess)
                .catch((error) => {
                    throw error;
                });
        });

const signOut = (action$) => action$
        .ofType(ACTION_TYPES.SIGN_OUT)
        .switchMap(() => {
            const signOutUrl = `${window.config.API.HOST}/session/sign-out`;

            return Observable.ajax
                .get(signOutUrl, {
                    'Content-Type': 'application/json'
                })
                .map(actions.signOutSuccess)
                .catch((error) => {
                    throw error;
                });
        });

const signUp = (action$) => action$
        .ofType(ACTION_TYPES.SIGN_UP)
        .switchMap((action) => {
            const signUpUrl = `${window.config.API.HOST}/session/sign-up`;

            return Observable.ajax
                .post(signUpUrl, {
                    email: action.email,
                    name: action.name,
                    password: action.password,
                    username: action.username
                }, {
                    'Content-Type': 'application/json'
                })
                .map(actions.signUpSuccess)
                .catch((error) => {
                    throw error;
                });
        });

const updateProfile = (action$) => action$
        .ofType(ACTION_TYPES.UPDATE_PROFILE)
        .switchMap((action) => {
            const updateProfileUrl = `${window.config.API.HOST}/session/update-profile`;

            return Observable.ajax
                .put(updateProfileUrl, action.user, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(actions.updateProfileSuccess)
                .catch((error) => {
                    throw error;
                });
        });

export default combineEpics(
    signIn,
    signOut,
    signUp,
    updateProfile
);
