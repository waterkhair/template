const ACTION_TYPE = {
    LOG_IN: 'LOG_IN',
    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    LOG_OUT: 'LOG_OUT',
    LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
    REGISTER_USER: 'REGISTER_USER',
    REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS'
};

const logIn = (username, password) => ({
    type: ACTION_TYPE.LOG_IN,
    username,
    password
});

const logInSuccess = (response) => ({
    type: ACTION_TYPE.LOG_IN_SUCCESS,
    token: response.response.token,
    session: {
        username: response.response.session.username,
        email: response.response.session.email,
        displayName: response.response.session.displayName
    }
});

const registerUser = (username, password, email, displayName) => ({
    type: ACTION_TYPE.REGISTER_USER,
    username,
    password,
    email,
    displayName
});

const registerUserSuccess = (response) => ({
    type: ACTION_TYPE.REGISTER_USER_SUCCESS,
    token: response.response.token,
    session: {
        username: response.response.session.username,
        email: response.response.session.email,
        displayName: response.response.session.displayName
    }
});

const logOut = () => ({
    type: ACTION_TYPE.LOG_OUT
});

const logOutSuccess = () => ({
    type: ACTION_TYPE.LOG_OUT_SUCCESS
});

export default {
    ACTION_TYPE,
    logIn,
    logInSuccess,
    logOut,
    logOutSuccess,
    registerUser,
    registerUserSuccess
};
