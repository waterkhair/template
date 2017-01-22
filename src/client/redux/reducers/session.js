// Modules
import ACTION_TYPES from '../../const/action_types';
import JWT from 'jsonwebtoken';

const INITIAL_STATE = {
        credentials: {
            email: '',
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
    case ACTION_TYPES.SIGN_IN_SUCCESS:
    case ACTION_TYPES.SIGN_UP_SUCCESS:
    case ACTION_TYPES.UPDATE_PROFILE_SUCCESS: {
        const credentials = JWT.decode(action.token);

        return {
            ...state,
            credentials: {
                email: credentials.email,
                name: credentials.name,
                scope: credentials.scope,
                username: credentials.username
            },
            settings: credentials.settings ? credentials.settings : state.credentials.settings,
            token: action.token
        };
    }
    case ACTION_TYPES.SIGN_OUT_SUCCESS:
        return initialState();
    case ACTION_TYPES.UPDATE_SETTINGS_SUCCESS:
        return {
            ...state,
            settings: action.settings
        };
    default:
        return state;
    }
};
