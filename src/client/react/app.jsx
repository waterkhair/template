// Modules
import 'flexboxgrid';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import {applyMiddleware, createStore} from 'redux';
import AboutPage from './pages/about/about_page';
import DefaultLayout from './layouts/default';
import ErrorPage from './pages/error/error_page';
import HomePage from './pages/home/home_page';
import LoginPage from './pages/session/login_page';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfilePage from './pages/session/profile_page';
import {Provider} from 'react-redux';
import React from 'react';
import SettingsPage from './pages/session/settings_page';
import UsersPage from './pages/users/users_page';
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
    const sessionState = store.getState().session;

    if (sessionState.token === '') {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }
};

const requireAdminScope = (nextState, replaceState) => {
    const sessionState = store.getState().session;

    if (sessionState.token === '') {
        replaceState({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    } else if (sessionState.user.scope !== 'admin') {
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
                    <IndexRoute name="Home" component={HomePage} onEnter={requireUserScope} />
                    <Route name="About" path="/about" component={AboutPage} onEnter={requireUserScope} />
                    <Route name="Error" path="/error" component={ErrorPage} />
                    <Route name="Profile" path="/profile" component={ProfilePage} onEnter={requireUserScope} />
                    <Route name="Settings" path="/settings" component={SettingsPage} onEnter={requireUserScope} />
                    <Route name="Users" path="/users" component={UsersPage} onEnter={requireAdminScope} />
                </Route>
                <Route name="Login" path="/login" component={LoginPage} />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
