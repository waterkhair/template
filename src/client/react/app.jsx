// Modules
import 'flexboxgrid';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import {applyMiddleware, createStore} from 'redux';
import AboutPage from './pages/about/about_page';
import AdminLayout from './layouts/admin';
import DefaultLayout from './layouts/default';
import ErrorPage from './pages/error/error_page';
import HomePage from './pages/home/home_page';
import LoggedLayout from './layouts/logged';
import LoginPage from './pages/login/login_page';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import React from 'react';
import UsersPage from './pages/users/users_page';
import {createEpicMiddleware} from 'redux-observable';
import epics from '../redux/epics/epics';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from '../redux/reducers/reducers';
import {render} from 'react-dom';

const store = createStore(reducers, applyMiddleware(createEpicMiddleware(epics)));

injectTapEventPlugin();

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory}>
                <Route component={AdminLayout}>
                    <Route component={DefaultLayout}>
                        <Route name="Users" path="/users" component={UsersPage} />
                    </Route>
                </Route>
                <Route component={LoggedLayout}>
                    <Route path="/" component={DefaultLayout}>
                        <IndexRoute name="Home" component={HomePage} />
                        <Route name="About" path="/about" component={AboutPage} />
                        <Route name="Error" path="/error" component={ErrorPage} />
                    </Route>
                </Route>
                <Route name="Login" path="/login" component={LoginPage} />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
