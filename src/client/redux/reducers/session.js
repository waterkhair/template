// Modules
import ACTION_TYPES from '../../const/action_types';
import JWT from 'jsonwebtoken';

const INITIAL_STATE = {
        navigation: {
            previousUrl: ''
        },
        token: '',
        user: {
            email: '',
            name: '',
            scope: '',
            username: ''
        }
    },
    initialState = () => INITIAL_STATE;

export default (state = initialState(), action) => {
    switch (action.type) {
    case ACTION_TYPES.SET_PREVIOUS_URL:
        return {
            ...state,
            navigation: {
                previousUrl: action.previousUrl
            }
        };
    case ACTION_TYPES.SIGN_IN_SUCCESS:
    case ACTION_TYPES.SIGN_UP_SUCCESS: {
        const user = JWT.decode(action.token);

        return {
            ...state,
            token: action.token,
            user: {
                email: user.email,
                name: user.name,
                scope: user.scope,
                username: user.username
            }
        };
    }
    case ACTION_TYPES.SIGN_OUT_SUCCESS:
        return initialState();
    default:
        return state;
    }
};
