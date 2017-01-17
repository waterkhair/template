// Modules
import ACTION_TYPES from '../../const/action_types';

const FIRST_INDEX = 0;
const NEXT_INDEX = 1;

/* Error type
error:
    code: ''
    message: false
    milliseconds: 0
    type: '' (SESSION, USERS)
*/

const getInitialState = () => Object.assign({}, {
    // Array of errors
    errors: []
});

export default (state = getInitialState(), action) => {
    switch (action.type) {
    case ACTION_TYPES.ADD_ERROR: {
        return {
            ...state,
            errors: [
                ...state.errors, {
                    code: action.code,
                    message: action.message,
                    milliseconds: action.milliseconds,
                    type: action.errorType
                }
            ]
        };
    }
    case ACTION_TYPES.CLEAR_ERRORS: {
        return {
            ...state,
            errors: getInitialState().errors
        };
    }
    case ACTION_TYPES.REMOVE_ERROR: {
        let index = 0;

        for (let iteration = 0; iteration < state.errors; iteration++) {
            if (state.errors[iteration].code === action.code) {
                index = iteration;
                break;
            }
        }

        return {
            ...state,
            errors: [
                ...state.errors.slice(FIRST_INDEX, index),
                ...state.errors.slice(FIRST_INDEX + NEXT_INDEX)
            ]
        };
    }
    default:
        return state;
    }
};
