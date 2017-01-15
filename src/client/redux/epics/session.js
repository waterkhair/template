// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import ACTION_TYPES from '../../const/action_types';
import Config from '../../config/main';
import {Observable} from 'rxjs/Observable';
import actions from '../actions/session';
import {combineEpics} from 'redux-observable';

const signIn = (action$) => action$
    .ofType(ACTION_TYPES.SIGN_IN)
        .switchMap((action) =>
            Observable.ajax
                .post(window.config.API.ROUTES.SESSION.SIGN_IN, {
                    password: action.password,
                    username: action.username
                }, {
                    'Content-Type': 'application/json'
                })
                .map(actions.signInSuccess)
                .catch((error) => {
                    throw error;
                })
        );

const signOut = (action$) => action$
        .ofType(ACTION_TYPES.SIGN_OUT)
        .switchMap(() =>
            Observable.ajax
                .get(window.config.API.ROUTES.SESSION.SIGN_OUT, {
                    'Content-Type': 'application/json'
                })
                .map(actions.signOutSuccess)
                .catch((error) => {
                    throw error;
                })
        );

const signUp = (action$) => action$
        .ofType(ACTION_TYPES.SIGN_UP)
        .switchMap((action) =>
            Observable.ajax
                .post(window.config.API.ROUTES.SESSION.SIGN_UP, {
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
                })
        );

const updateProfile = (action$) => action$
        .ofType(ACTION_TYPES.UPDATE_PROFILE)
        .switchMap((action) =>
            Observable.ajax
                .put(Config.API.ROUTES.SESSION.UPDATE_PROFILE, action.user, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(actions.updateProfileSuccess)
                .catch((error) => {
                    throw error;
                })
        );

export default combineEpics(
    signIn,
    signOut,
    signUp,
    updateProfile
);
