// Modules
import ACTION_TYPES from '../../const/action_types';

const INITIAL_STATE = {
        token: '',
        user: {
            admin: false,
            email: '',
            name: '',
            username: ''
        }
    },
    initialState = () => INITIAL_STATE;

export default (state = initialState(), action) => {
    switch (action.type) {
    case ACTION_TYPES.SIGN_IN_SUCCESS:
    case ACTION_TYPES.SIGN_UP_SUCCESS:
        return {
            ...state,
            token: action.token,
            user: {
                admin: action.user.admin,
                email: action.user.email,
                name: action.user.name,
                username: action.user.username
            }
        };
    case ACTION_TYPES.SIGN_OUT_SUCCESS:
        return initialState();
    default:
        return state;
    }
};
