import actions from '../actions/session';

const INITIAL_STATE = {
        session: {
            displayName: '',
            email: '',
            username: ''
        },
        token: ''
    },
    initialState = () => INITIAL_STATE;

export default (state = initialState(), action) => {
    switch (action.type) {
    case actions.ACTION_TYPE.LOG_IN_SUCCESS:
    case actions.ACTION_TYPE.REGISTER_USER_SUCCESS:
        return {
            ...state,
            session: {
                displayName: action.session.displayName,
                email: action.session.email,
                username: action.session.username
            },
            token: action.token
        };
    case actions.ACTION_TYPE.LOG_OUT_SUCCESS:
        return initialState();
    default:
        return state;
    }
};
