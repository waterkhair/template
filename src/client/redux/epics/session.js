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
import Config from '../../config/main';
import ERRORS from '../../const/errors';
import NOTIFICATIONS from '../../const/notifications';
import {Observable} from 'rxjs/Observable';
import SessionActions from '../actions/session';
import {combineEpics} from 'redux-observable';
import {createRequestHeader} from '../../helpers/header';

const getSettings = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.GET_SETTINGS)
    .switchMap((action) =>
        Observable.ajax
            .get(window.config.API.ROUTES.SESSION.GET_SETTINGS, createRequestHeader(action.token))
            .map((res) => SessionActions.getSettingsSuccess({settings: res.response.settings}))
            .catch(createErrorNotification(ERRORS.CODES.GET_SETTINGS_ERROR, ERRORS.TYPES.SESSION))
    );

const signIn = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.SIGN_IN)
    .switchMap((action) =>
        Observable.ajax
            .post(window.config.API.ROUTES.SESSION.SIGN_IN, action.data, createRequestHeader())
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.signInSuccess({token: res.response.token})),
                    createNotification(ACTION_TYPES.SESSION.SIGN_IN_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Logged in'))
            )
            .catch(createErrorNotification(ERRORS.CODES.SIGN_IN_ERROR, ERRORS.TYPES.SESSION))
    );

const signOut = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.SIGN_OUT)
    .switchMap(() =>
        Observable.ajax
            .get(window.config.API.ROUTES.SESSION.SIGN_OUT, createRequestHeader())
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.signOutSuccess({res})),
                    createNotification(ACTION_TYPES.SESSION.SIGN_OUT_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Logged out'))
            )
            .catch(createErrorNotification(ERRORS.CODES.SIGN_OUT_ERROR, ERRORS.TYPES.SESSION))
    );

const signUp = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.SIGN_UP)
    .switchMap((action) =>
        Observable.ajax
            .post(window.config.API.ROUTES.SESSION.SIGN_UP, action.data, createRequestHeader())
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.signUpSuccess({token: res.response.token})),
                    createNotification(ACTION_TYPES.SESSION.SIGN_UP_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Signed up'))
            )
            .catch(createErrorNotification(ERRORS.CODES.SIGN_UP_ERROR, ERRORS.TYPES.SESSION))
    );

const updateProfile = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.UPDATE_PROFILE)
    .switchMap((action) =>
        Observable.ajax
            .put(Config.API.ROUTES.SESSION.UPDATE_PROFILE, action.data, createRequestHeader(action.token))
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.updateProfileSuccess({token: res.response.token})),
                    createNotification(ACTION_TYPES.SESSION.UPDATE_PROFILE_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Updated'))
            )
            .catch(createErrorNotification(ERRORS.CODES.UPDATE_PROFILE_ERROR, ERRORS.TYPES.SESSION))
    );

const updateSettings = (action$) => action$
    .ofType(ACTION_TYPES.SESSION.UPDATE_SETTINGS)
    .switchMap((action) =>
        Observable.ajax
            .put(Config.API.ROUTES.SESSION.UPDATE_SETTINGS, action.data, createRequestHeader(action.token))
            .flatMap((res) =>
                Observable.concat(
                    Observable.of(SessionActions.updateSettingsSuccess({settings: res.response.settings})),
                    createNotification(ACTION_TYPES.SESSION.UPDATE_SETTINGS_SUCCESS, NOTIFICATIONS.TYPES.SESSION, 'Updated!'))
            )
            .catch(createErrorNotification(ERRORS.CODES.UPDATE_SETTINGS_ERROR, ERRORS.TYPES.SESSION))
    );

export default combineEpics(
    getSettings,
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateSettings
);
