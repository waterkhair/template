// Modules
import combineReducers from 'redux/lib/combineReducers';
import notifications from './notifications';
import {routerReducer} from 'react-router-redux';
import session from './session';
import users from './users';

const reducers = combineReducers({
    notifications,
    routing: routerReducer,
    session,
    users
});

export default reducers;
