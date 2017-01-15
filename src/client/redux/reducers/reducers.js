// Modules
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import session from './session';
import users from './users';

const reducers = combineReducers({
    routing: routerReducer,
    session,
    users
});

export default reducers;
