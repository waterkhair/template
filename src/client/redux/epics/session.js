// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import ACTION_TYPES from '../../const/action_types';
import Config from '../../config/main';
import ERRORS from '../../const/errors';
import JWT from 'jsonwebtoken';
import {Observable} from 'rxjs/Observable';
import SessionActions from '../actions/session';
import {combineEpics} from 'redux-observable';
import errorHelper from '../../helpers/error';

const getSettings = (action$) => action$
    .ofType(ACTION_TYPES.GET_SETTINGS)
        .switchMap((action) => {
            const token = JWT.decode(action.token);

            return Observable.ajax
                .post(window.config.API.ROUTES.SESSION.GET_SETTINGS, {
                    username: token.username
                }, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(SessionActions.getSettingsSuccess)
                .catch((err) =>
                    errorHelper.ajaxErrorHandler(
                        ERRORS.CODES.GET_SETTINGS_ERROR,
                        ERRORS.TYPES.SESSION,
                        err.xhr,
                        ACTION_TYPES.ADD_ERROR));
        });

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
                .put(Config.API.ROUTES.SESSION.UPDATE_PROFILE, action.profile, {
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

const updateSettings = (action$) => action$
        .ofType(ACTION_TYPES.UPDATE_SETTINGS)
        .switchMap((action) =>
            Observable.ajax
                .put(Config.API.ROUTES.SESSION.UPDATE_SETTINGS, action.settings, {
                    'Authorization': `Bearer ${action.token}`,
                    'Content-Type': 'application/json'
                })
                .map(SessionActions.updateSettingsSuccess)
                .catch((err) =>
                    errorHelper.ajaxErrorHandler(
                        ERRORS.CODES.UPDATE_SETTINGS_ERROR,
                        ERRORS.TYPES.SESSION,
                        err.xhr,
                        ACTION_TYPES.ADD_ERROR))
        );

export default combineEpics(
    getSettings,
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateSettings
);
