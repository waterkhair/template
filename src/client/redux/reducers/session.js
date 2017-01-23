// Modules
import ACTION_TYPES from '../../const/action_types';
import JWT from 'jsonwebtoken';

const INITIAL_STATE = {
        credentials: {
            email: '',
            isAuthenticated: false,
            name: '',
            scope: '',
            username: ''
        },
        navigation: {
            loginLocation: ''
        },
        settings: {
            theme: ''
        },
        token: ''
    },
    initialState = () => INITIAL_STATE;

export default (state = initialState(), action) => {
    switch (action.type) {
    case ACTION_TYPES.GET_PROFILE_SUCCESS:
        return {
            ...state,
            credentials: Object.assign(state.credentials, action.profile)
        };
    case ACTION_TYPES.GET_SETTINGS_SUCCESS:
    case ACTION_TYPES.UPDATE_SETTINGS_SUCCESS:
        return {
            ...state,
            settings: action.settings
        };
    case ACTION_TYPES.SIGN_IN_SUCCESS:
    case ACTION_TYPES.SIGN_UP_SUCCESS: {
        const token = JWT.decode(action.token);

        return {
            ...state,
            credentials: {
                email: token.email,
                isAuthenticated: token.isAuthenticated,
                name: token.name,
                scope: token.scope,
                username: token.username
            },
            settings: token.settings ? token.settings : state.settings,
            token: action.token
        };
    }
    case ACTION_TYPES.UPDATE_PROFILE_SUCCESS: {
        const token = JWT.decode(action.token);

        return {
            ...state,
            credentials: {
                email: token.email,
                isAuthenticated: token.isAuthenticated,
                name: token.name,
                scope: token.scope,
                username: token.username
            }
        };
    }
    case ACTION_TYPES.SIGN_OUT_SUCCESS:
        return initialState();
    default:
        return state;
    }
};
