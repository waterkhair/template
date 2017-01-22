// Modules
import 'flexboxgrid';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import {applyMiddleware, createStore} from 'redux';
import AboutPage from './pages/auth/about/about';
import DefaultLayout from './layouts/default';
import ErrorPage from './pages/public/error/error';
import HomePage from './pages/auth/home/home';
import LoginPage from './pages/public/login/login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfilePage from './pages/auth/session/profile';
import {Provider} from 'react-redux';
import React from 'react';
import SettingsPage from './pages/auth/session/settings';
import UsersPage from './pages/admin/users/users';
import {createEpicMiddleware} from 'redux-observable';
import epics from '../redux/epics/epics';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from '../redux/reducers/reducers';
import {render} from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux';

const store = createStore(reducers, applyMiddleware(createEpicMiddleware(epics)));
const history = syncHistoryWithStore(browserHistory, store);

const requireUserScope = (nextState, replace) => {
    let sessionState = store.getState().session;

    if (sessionState.token === '') {
        sessionState = Object.assign(sessionState, {
            navigation: {
                loginLocation: nextState.location.pathname
            }
        });

        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
};

const requireAdminScope = (nextState, replaceState) => {
    let sessionState = store.getState().session;

    if (sessionState.token === '') {
        sessionState = Object.assign(sessionState, {
            navigation: {
                loginLocation: nextState.location.pathname
            }
        });

        replaceState({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    } else if (sessionState.credentials.scope !== 'admin') {
        replaceState({
            pathname: '/',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
};

injectTapEventPlugin();

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={history}>
                <Route path="/" component={DefaultLayout} onEnter={requireUserScope}>
                    <IndexRoute name="Home" component={HomePage} />
                    <Route name="About" path="/about" component={AboutPage} />
                    <Route name="Profile" path="/profile" component={ProfilePage} />
                    <Route name="Settings" path="/settings" component={SettingsPage} />
                    <Route name="Users" path="/users" component={UsersPage} onEnter={requireAdminScope} />
                </Route>
                <Route name="Error" path="/error" component={ErrorPage} />
                <Route name="Login" path="/login" component={LoginPage} />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
