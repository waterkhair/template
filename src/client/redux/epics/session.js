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
import SessionActions from '../actions/session';
import {combineEpics} from 'redux-observable';
import errorHelper from '../../helpers/error';

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
                .map(SessionActions.signInSuccess)
                .catch((err) =>
                    errorHelper.ajaxErrorHandler(
                        ERRORS.CODES.SIGN_IN_ERROR,
                        ERRORS.TYPES.SESSION,
                        err.xhr,
                        ACTION_TYPES.ADD_ERROR))
        );

const signOut = (action$) => action$
        .ofType(ACTION_TYPES.SIGN_OUT)
        .switchMap(() =>
            Observable.ajax
                .get(window.config.API.ROUTES.SESSION.SIGN_OUT, {
                    'Content-Type': 'application/json'
                })
                .map(SessionActions.signOutSuccess)
                .catch((err) =>
                    errorHelper.ajaxErrorHandler(
                        ERRORS.CODES.SIGN_OUT_ERROR,
                        ERRORS.TYPES.SESSION,
                        err.xhr,
                        ACTION_TYPES.ADD_ERROR))
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
                .map(SessionActions.signUpSuccess)
                .catch((err) =>
                    errorHelper.ajaxErrorHandler(
                        ERRORS.CODES.SIGN_UP_ERROR,
                        ERRORS.TYPES.SESSION,
                        err.xhr,
                        ACTION_TYPES.ADD_ERROR))
        );

const updateProfile = (action$) => action$
        .ofType(ACTION_TYPES.UPDATE_PROFILE)
        .switchMap((action) =>
            Observable.ajax
                .put(Config.API.ROUTES.SESSION.UPDATE_PROFILE, action.user, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(SessionActions.updateProfileSuccess)
                .catch((err) =>
                    errorHelper.ajaxErrorHandler(
                        ERRORS.CODES.UPDATE_PROFILE_ERROR,
                        ERRORS.TYPES.SESSION,
                        err.xhr,
                        ACTION_TYPES.ADD_ERROR))
        );

export default combineEpics(
    signIn,
    signOut,
    signUp,
    updateProfile
);
