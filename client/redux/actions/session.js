// Modules
import ACTION_TYPES from '../../const/action_types';
import {createAction} from '../../helpers/actions';

export default {
    closeProfile: createAction(ACTION_TYPES.SESSION.CLOSE_PROFILE),
    closeProfileSuccess: createAction(ACTION_TYPES.SESSION.CLOSE_PROFILE_SUCCESS),
    getSettings: createAction(ACTION_TYPES.SESSION.GET_SETTINGS),
    getSettingsSuccess: createAction(ACTION_TYPES.SESSION.GET_SETTINGS_SUCCESS),
    signIn: createAction(ACTION_TYPES.SESSION.SIGN_IN),
    signInSuccess: createAction(ACTION_TYPES.SESSION.SIGN_IN_SUCCESS),
    signOut: createAction(ACTION_TYPES.SESSION.SIGN_OUT),
    signOutSuccess: createAction(ACTION_TYPES.SESSION.SIGN_OUT_SUCCESS),
    signUp: createAction(ACTION_TYPES.SESSION.SIGN_UP),
    signUpSuccess: createAction(ACTION_TYPES.SESSION.SIGN_UP_SUCCESS),
    updateProfile: createAction(ACTION_TYPES.SESSION.UPDATE_PROFILE),
    updateProfileSuccess: createAction(ACTION_TYPES.SESSION.UPDATE_PROFILE_SUCCESS),
    updateSettings: createAction(ACTION_TYPES.SESSION.UPDATE_SETTINGS),
    updateSettingsSuccess: createAction(ACTION_TYPES.SESSION.UPDATE_SETTINGS_SUCCESS)
};
