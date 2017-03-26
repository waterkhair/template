// Modules
import 'flexboxgrid';
import {adminScopeValidator, userScopeValidator} from '../helpers/scope';
import AboutPage from './pages/auth/about/about';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import ErrorPage from './pages/public/error/error';
import HomePage from './pages/auth/home/home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfilePage from './pages/auth/session/profile';
import Provider from 'react-redux/lib/components/Provider';
import React from 'react';
import Route from 'react-router-dom/Route';
import SettingsPage from './pages/auth/session/settings';
import UsersPage from './pages/admin/users/users';
import applyMiddleware from 'redux/lib/applyMiddleware';
import {createEpicMiddleware} from 'redux-observable';
import createStore from 'redux/lib/createStore';
import epics from '../redux/epics/epics';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from '../redux/reducers/reducers';
import {render} from 'react-dom';

// Create redux store with reducers, redux dev tool extension and epics
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(createEpicMiddleware(epics)));

// PlugIn to fix the onClick delay issue for React
injectTapEventPlugin();

// Render React App on the app div
render(
    <Provider
        store={store}>
        <MuiThemeProvider
            muiTheme={getMuiTheme()}>
            <BrowserRouter
                history={history}>
                <div>
                    <Route
                        key={0}
                        name="Home"
                        exact path="/"
                        render={userScopeValidator(store, HomePage)} />
                    <Route
                        key={1}
                        name="About"
                        path="/about"
                        render={userScopeValidator(store, AboutPage)} />
                    <Route
                        component={ErrorPage}
                        key={2}
                        name="Error"
                        path="/error" />
                    <Route
                        key={4}
                        name="Profile"
                        path="/profile"
                        render={userScopeValidator(store, ProfilePage)} />
                    <Route
                        key={5}
                        name="Settings"
                        path="/settings"
                        render={userScopeValidator(store, SettingsPage)} />
                    <Route
                        key={6}
                        name="Users"
                        path="/users"
                        render={adminScopeValidator(store, UsersPage)} />
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
