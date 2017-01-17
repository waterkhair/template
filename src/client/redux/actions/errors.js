// Modules
import ACTION_TYPES from '../../const/action_types';

const addError = (code, type, message, milliseconds) => ({
    code,
    errorType: type,
    message,
    milliseconds,
    type: ACTION_TYPES.ADD_ERROR
});

const clearErrors = () => ({
    type: ACTION_TYPES.CLEAR_ERRORS
});

const removeError = (code) => ({
    code,
    type: ACTION_TYPES.REMOVE_ERROR
});

export default {
    addError,
    clearErrors,
    removeError
};
