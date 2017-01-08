const ACTION_TYPE = {
        LOG_IN: 'LOG_IN',
        LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
        LOG_OUT: 'LOG_OUT',
        LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
        REGISTER_USER: 'REGISTER_USER',
        REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS'
    },
    logIn = (username, password) => ({
        password,
        type: ACTION_TYPE.LOG_IN,
        username
    }),
    logInSuccess = (response) => ({
        session: {
            displayName: response.response.session.displayName,
            email: response.response.session.email,
            username: response.response.session.username
        },
        token: response.response.token,
        type: ACTION_TYPE.LOG_IN_SUCCESS
    }),
    logOut = () => ({
        type: ACTION_TYPE.LOG_OUT
    }),
    logOutSuccess = () => ({
        type: ACTION_TYPE.LOG_OUT_SUCCESS
    }),
    registerUser = (username, password, email, displayName) => ({
        displayName,
        email,
        password,
        type: ACTION_TYPE.REGISTER_USER,
        username
    }),
    registerUserSuccess = (response) => ({
        session: {
            displayName: response.response.session.displayName,
            email: response.response.session.email,
            username: response.response.session.username
        },
        token: response.response.token,
        type: ACTION_TYPE.REGISTER_USER_SUCCESS
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
