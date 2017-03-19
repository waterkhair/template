// Modules
import 'flexboxgrid';
import {adminScopeValidator, userScopeValidator} from '../helpers/scope';
import AboutPage from './pages/auth/about/about';
import DefaultLayout from './layouts/default';
import ErrorPage from './pages/public/error/error';
import HomePage from './pages/auth/home/home';
import IndexRoute from 'react-router/lib/IndexRoute';
import LoginPage from './pages/public/login/login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfilePage from './pages/auth/session/profile';
import Provider from 'react-redux/lib/components/Provider';
import React from 'react';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import SettingsPage from './pages/auth/session/settings';
import UsersPage from './pages/admin/users/users';
import applyMiddleware from 'redux/lib/applyMiddleware';
import browserHistory from 'react-router/lib/browserHistory';
import {createEpicMiddleware} from 'redux-observable';
import createStore from 'redux/lib/createStore';
import epics from '../redux/epics/epics';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from '../redux/reducers/reducers';
import {render} from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux';

// Create redux store with reducers, redux dev tool extension and epics
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(createEpicMiddleware(epics)));

// Sync history with redux store
const history = syncHistoryWithStore(browserHistory, store);

// PlugIn to fix the onClick delay issue for React
injectTapEventPlugin();

// Render React App on the app div
render(
    <Provider
        store={store}>
        <MuiThemeProvider
            muiTheme={getMuiTheme()}>
            <Router
                history={history}>
                <Route
                    component={DefaultLayout}
                    onEnter={userScopeValidator(store)}
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
                        onEnter={adminScopeValidator(store)}
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
