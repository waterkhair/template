// Modules
import {combineReducers} from 'redux';
import errors from './errors';
import {routerReducer} from 'react-router-redux';
import session from './session';
import users from './users';

const reducers = combineReducers({
    errors,
    routing: routerReducer,
    session,
    users
});

export default reducers;
