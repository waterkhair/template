// Modules
import ACTION_TYPES from '../../const/action_types';

const getSettings = (token) => ({
    token,
    type: ACTION_TYPES.GET_SETTINGS
});

const getSettingsSuccess = (res) => ({
    settings: res.response.settings,
    type: ACTION_TYPES.GET_SETTINGS_SUCCESS
});

const signIn = (username, password) => ({
    password,
    type: ACTION_TYPES.SIGN_IN,
    username
});

const signInSuccess = (res) => ({
    token: res.response.token,
    type: ACTION_TYPES.SIGN_IN_SUCCESS
});

const signOut = () => ({
    type: ACTION_TYPES.SIGN_OUT
});

const signOutSuccess = () => ({
    type: ACTION_TYPES.SIGN_OUT_SUCCESS
});

const signUp = (email, name, username, password) => ({
    email,
    name,
    password,
    type: ACTION_TYPES.SIGN_UP,
    username
});

const signUpSuccess = (res) => ({
    token: res.response.token,
    type: ACTION_TYPES.SIGN_UP_SUCCESS
});

const updateProfile = (profile, token) => ({
    profile,
    token,
    type: ACTION_TYPES.UPDATE_PROFILE
});

const updateProfileSuccess = (res) => ({
    token: res.response.token,
    type: ACTION_TYPES.UPDATE_PROFILE_SUCCESS
});

const updateSettings = (settings, token) => ({
    settings,
    token,
    type: ACTION_TYPES.UPDATE_SETTINGS
});

const updateSettingsSuccess = (res) => ({
    settings: res.response.settings,
    type: ACTION_TYPES.UPDATE_SETTINGS_SUCCESS
});

export default {
    getSettings,
    getSettingsSuccess,
    signIn,
    signInSuccess,
    signOut,
    signOutSuccess,
    signUp,
    signUpSuccess,
    updateProfile,
    updateProfileSuccess,
    updateSettings,
    updateSettingsSuccess
};
