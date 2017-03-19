// Modules
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import {createErrorNotification, createNotification} from '../../helpers/notifications';
import ACTION_TYPES from '../../const/action_types';
import ERRORS from '../../const/errors';
import NOTIFICATIONS from '../../const/notifications';
import {Observable} from 'rxjs/Observable';
import SessionActions from '../actions/session';
import {combineEpics} from 'redux-observable';
import {createRequestHeaders} from '../../helpers/headers';

const closeProfile = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.CLOSE_PROFILE)
    .switchMap((action) =>
        Observable.ajax
            .delete(`${window.config.API.ROUTES.USERS.DELETE_USER}/${action.username}`, createRequestHeaders(action.token))
            .map((res) => SessionActions.closeProfileSuccess(res.response.payload))
            .catch(createErrorNotification(ERRORS.CODES.CLOSE_PROFILE_ERROR, ERRORS.TYPES.SESSION))
    );

const getSettings = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.GET_SETTINGS)
    .switchMap((action) =>
        Observable.ajax
            .get(`${window.config.API.ROUTES.SETTINGS.GET_SETTINGS}/${action.username}`, createRequestHeaders(action.token))
            .map((res) => SessionActions.getSettingsSuccess(res.response.payload))
            .catch(createErrorNotification(ERRORS.CODES.GET_SETTINGS_ERROR, ERRORS.TYPES.SESSION))
    );

const signIn = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.SIGN_IN)
    .switchMap((action) =>
        Observable.ajax
            .post(window.config.API.ROUTES.SESSION.LOGIN, action.data, createRequestHeaders())
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.signInSuccess(res.response.payload)),
                    createNotification(ACTION_TYPES.SESSION.SIGN_IN_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Logged in'))
            )
            .catch(createErrorNotification(ERRORS.CODES.SIGN_IN_ERROR, ERRORS.TYPES.SESSION))
    );

const signOut = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.SIGN_OUT)
    .switchMap(() =>
        Observable.ajax
            .get(window.config.API.ROUTES.SESSION.SIGN_OUT, createRequestHeaders())
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.signOutSuccess(res.response.payload)),
                    createNotification(ACTION_TYPES.SESSION.SIGN_OUT_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Logged out'))
            )
            .catch(createErrorNotification(ERRORS.CODES.SIGN_OUT_ERROR, ERRORS.TYPES.SESSION))
    );

const signUp = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.SIGN_UP)
    .switchMap((action) =>
        Observable.ajax
            .post(window.config.API.ROUTES.USERS.CREATE_USER, action.data, createRequestHeaders())
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.signUpSuccess(res.response.payload)),
                    createNotification(ACTION_TYPES.SESSION.SIGN_UP_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Signed up'))
            )
            .catch(createErrorNotification(ERRORS.CODES.SIGN_UP_ERROR, ERRORS.TYPES.SESSION))
    );

const updateProfile = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.UPDATE_PROFILE)
    .switchMap((action) =>
        Observable.ajax
            .put(`${window.config.API.ROUTES.USERS.UPDATE_USER}/${action.username}`, action.data, createRequestHeaders(action.token))
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.updateProfileSuccess(res.response.payload)),
                    createNotification(ACTION_TYPES.SESSION.UPDATE_PROFILE_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Updated'))
            )
            .catch(createErrorNotification(ERRORS.CODES.UPDATE_PROFILE_ERROR, ERRORS.TYPES.SESSION))
    );

const updateSettings = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.UPDATE_SETTINGS)
    .switchMap((action) =>
        Observable.ajax
            .put(`${window.config.API.ROUTES.SETTINGS.UPDATE_SETTINGS}/${action.username}`, action.data, createRequestHeaders(action.token))
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.updateSettingsSuccess(res.response.payload)),
                    createNotification(ACTION_TYPES.SESSION.UPDATE_SETTINGS_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Updated!'))
            )
            .catch(createErrorNotification(ERRORS.CODES.UPDATE_SETTINGS_ERROR, ERRORS.TYPES.SESSION))
    );

export default combineEpics(
    closeProfile,
    getSettings,
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateSettings
);
