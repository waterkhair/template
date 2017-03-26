// Modules
import combineReducers from 'redux/lib/combineReducers';
import notifications from './notifications';
import session from './session';
import users from './users';

const reducers = combineReducers({
    notifications,
    session,
    users
});

export default reducers;
