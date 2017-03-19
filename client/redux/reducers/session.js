// Modules
import ACTION_TYPES from '../../const/action_types';
import decode from 'jsonwebtoken/decode';

/**
 * Creates the initial session redux state
 * @return {object} Returns initial session redux state
 */
const getInitialState = () => Object.assign({}, {
    credentials: {
        email: '',
        name: '',
        scope: '',
        username: ''
    },
    isAuthenticated: false,
    navigation: {
        loginLocation: ''
    },
    settings: {
        theme: ''
    },
    token: ''
});

export default (state = getInitialState(), action) => {
    switch (action.type) {
    case ACTION_TYPES.SESSION.GET_SETTINGS_SUCCESS:
    case ACTION_TYPES.SESSION.UPDATE_SETTINGS_SUCCESS:
        return {
            ...state,
            settings: action.settings
        };
    case ACTION_TYPES.SESSION.SIGN_IN_SUCCESS:
    case ACTION_TYPES.SESSION.SIGN_UP_SUCCESS: {
        const token = decode(action.token);

        return {
            ...state,
            credentials: {
                email: token.email,
                name: token.name,
                scope: token.scope,
                username: token.username
            },
            isAuthenticated: true,
            token: action.token
        };
    }
    case ACTION_TYPES.SESSION.UPDATE_PROFILE_SUCCESS: {
        const token = decode(action.token);

        return {
            ...state,
            credentials: {
                email: token.email,
                name: token.name,
                scope: token.scope,
                username: token.username
            }
        };
    }
    case ACTION_TYPES.SESSION.CLOSE_PROFILE_SUCCESS:
    case ACTION_TYPES.SESSION.SIGN_OUT_SUCCESS:
        return getInitialState();
    default:
        return state;
    }
};
