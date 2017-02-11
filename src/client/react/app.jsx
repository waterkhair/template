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

    if (!sessionState.isAuthenticated) {
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

    if (!sessionState.isAuthenticated) {
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
    <Provider
        store={store}>
        <MuiThemeProvider
            muiTheme={getMuiTheme()}>
            <Router
                history={history}>
                <Route
                    component={DefaultLayout}
                    onEnter={requireUserScope}
                    path="/">
                    <IndexRoute
                        component={HomePage}
                        name="Home" />
                    <Route
                        component={AboutPage}
                        name="About"
                        path="/about" />
                    <Route
                        component={ProfilePage}
                        name="Profile"
                        path="/profile" />
                    <Route
                        component={SettingsPage}
                        name="Settings"
                        path="/settings" />
                    <Route
                        component={UsersPage}
                        name="Users"
                        onEnter={requireAdminScope}
                        path="/users" />
                </Route>
                <Route
                    component={ErrorPage}
                    name="Error"
                    path="/error" />
                <Route
                    component={LoginPage}
                    name="Login"
                    path="/login" />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
