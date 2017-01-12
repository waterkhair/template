// Mmdules
import ACTION_TYPES from '../../const/action_types';

const setPreviousUrl = (previousUrl) => ({
    previousUrl,
    type: ACTION_TYPES.SET_PREVIOUS_URL
});

const signIn = (username, password) => ({
    password,
    type: ACTION_TYPES.SIGN_IN,
    username
});

const signInSuccess = (response) => ({
    token: response.response.token,
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

const signUpSuccess = (response) => ({
    token: response.response.token,
    type: ACTION_TYPES.SIGN_UP_SUCCESS
});

export default {
    setPreviousUrl,
    signIn,
    signInSuccess,
    signOut,
    signOutSuccess,
    signUp,
    signUpSuccess
};
