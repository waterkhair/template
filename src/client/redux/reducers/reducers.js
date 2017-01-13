// Modules
import {combineReducers} from 'redux';
import session from './session';
import users from './users';

const reducers = combineReducers({
    session,
    users
});

export default reducers;
