// Modules
import {combineEpics} from 'redux-observable';
import session from './session';

const epics = combineEpics(
    session
);

export default epics;
