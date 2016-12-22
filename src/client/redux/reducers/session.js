import actions from '../actions/session';

const INITIAL_STATE = () => {
    return {
        token: null,
        session: {
            username: null,
            email: null,
            displayName: null
        }
    };
};

export default (state = INITIAL_STATE(), action) => {
    switch (action.type) {
        case actions.ACTION_TYPE.LOG_IN_SUCCESS:
        case actions.ACTION_TYPE.REGISTER_USER_SUCCESS:
            return {
                /*jshint ignore:start*/
                ...state,
                /*jshint ignore:end*/
                token: action.token,
                session: {
                    username: action.session.username,
                    email: action.session.email,
                    displayName: action.session.displayName
                }
            };
        case actions.ACTION_TYPE.LOG_OUT_SUCCESS:
            return INITIAL_STATE();
        default:
            return state;
    }
};
