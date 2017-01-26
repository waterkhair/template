// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import ACTION_TYPES from '../../const/action_types';
import Config from '../../config/main';
import ERRORS from '../../const/errors';
import NOTIFICATIONS from '../../const/notifications';
import {Observable} from 'rxjs/Observable';
import SessionActions from '../actions/session';
import {combineEpics} from 'redux-observable';
import notificationsHelper from '../../helpers/notifications';

const getSettings = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.GET_SETTINGS)
    .switchMap((action) => Observable.ajax
            .get(window.config.API.ROUTES.SESSION.GET_SETTINGS, {
                'Authorization': `Bearer ${action.token}`,
                'Content-Type': 'application/json'
            })
            .map(SessionActions.getSettingsSuccess)
            .catch((err) => {
                const message = err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE;

                return notificationsHelper.addNotification(
                    ERRORS.CODES.GET_SETTINGS_ERROR,
                    ERRORS.TYPES.SESSION,
                    message);
            })
    );

const signIn = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.SIGN_IN)
    .switchMap((action) =>
        Observable.ajax
            .post(window.config.API.ROUTES.SESSION.SIGN_IN, {
                password: action.password,
                username: action.username
            }, {
                'Content-Type': 'application/json'
            })
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.signInSuccess(res)),
                    notificationsHelper.addNotification(
                        ACTION_TYPES.SESSION.SIGN_IN_SUCCESS,
                        NOTIFICATIONS.TYPES.SESSION,
                        'Logged in'))
            )
            .catch((err) => {
                const message = err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE;

                return notificationsHelper.addNotification(
                    ERRORS.CODES.SIGN_IN_ERROR,
                    ERRORS.TYPES.SESSION,
                    message);
            })
    );

const signOut = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.SIGN_OUT)
    .switchMap(() =>
        Observable.ajax
            .get(window.config.API.ROUTES.SESSION.SIGN_OUT, {
                'Content-Type': 'application/json'
            })
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.signOutSuccess(res)),
                    notificationsHelper.addNotification(
                        ACTION_TYPES.SESSION.SIGN_OUT_SUCCESS,
                        NOTIFICATIONS.TYPES.SESSION,
                        'Logged out'))
            )
            .catch((err) => {
                const message = err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE;

                return notificationsHelper.addNotification(
                    ERRORS.CODES.SIGN_OUT_ERROR,
                    ERRORS.TYPES.SESSION,
                    message);
            })
    );

const signUp = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.SIGN_UP)
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
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.signUpSuccess(res)),
                    notificationsHelper.addNotification(
                        ACTION_TYPES.SESSION.SIGN_UP_SUCCESS,
                        NOTIFICATIONS.TYPES.SESSION,
                        'Signed up'))
            )
            .catch((err) => {
                const message = err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE;

                return notificationsHelper.addNotification(
                    ERRORS.CODES.SIGN_UP_ERROR,
                    ERRORS.TYPES.SESSION,
                    message);
            })
    );

const updateProfile = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.UPDATE_PROFILE)
    .switchMap((action) =>
        Observable.ajax
            .put(Config.API.ROUTES.SESSION.UPDATE_PROFILE, action.profile, {
                'Authorization': `Bearer ${action.token}`,
                'Content-Type': 'application/json'
            })
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.updateProfileSuccess(res)),
                    notificationsHelper.addNotification(
                        ACTION_TYPES.SESSION.UPDATE_PROFILE_SUCCESS,
                        NOTIFICATIONS.TYPES.SESSION,
                        'Updated'))
            )
            .catch((err) => {
                const message = err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE;

                return notificationsHelper.addNotification(
                    ERRORS.CODES.UPDATE_PROFILE_ERROR,
                    ERRORS.TYPES.SESSION,
                    message);
            })
    );

const updateSettings = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.UPDATE_SETTINGS)
    .switchMap((action) =>
        Observable.ajax
            .put(Config.API.ROUTES.SESSION.UPDATE_SETTINGS, action.settings, {
                'Authorization': `Bearer ${action.token}`,
                'Content-Type': 'application/json'
            })
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.updateSettingsSuccess(res)),
                    notificationsHelper.addNotification(
                        ACTION_TYPES.SESSION.UPDATE_SETTINGS_SUCCESS,
                        NOTIFICATIONS.TYPES.SESSION,
                        'Updated!'))
            )
            .catch((err) => {
                const message = err.xhr && err.xhr.response && err.xhr.response.message ? err.xhr.response.message : Config.ERRORS.GENERAL_ERROR_MESSAGE;

                return notificationsHelper.addNotification(
                    ERRORS.CODES.UPDATE_SETTINGS_ERROR,
                    ERRORS.TYPES.SESSION,
                    message);
            })
    );

export default combineEpics(
    getSettings,
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateSettings
);
