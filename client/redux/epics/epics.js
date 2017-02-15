// Modules
import {combineEpics} from 'redux-observable';
import session from './session';
import users from './users';

const epics = combineEpics(
    session,
    users
);

export default epics;
