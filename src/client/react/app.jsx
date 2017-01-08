// Modules
import {applyMiddleware, createStore} from 'redux';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import AboutPage from './pages/about/about';
import DefaultLayout from './layouts/default';
import ErrorPage from './pages/error/error';
import HomePage from './pages/home/home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import React from 'react';
import {createEpicMiddleware} from 'redux-observable';
import epics from '../redux/epics/epics';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from '../redux/reducers/reducers';
import {render} from 'react-dom';

const epicMiddleware = createEpicMiddleware(epics),
    store = createStore(reducers, applyMiddleware(epicMiddleware));

injectTapEventPlugin();

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory}>
                <Route path="/" component={DefaultLayout}>
                    <IndexRoute name="Home" component={HomePage} />
                    <Route name="About" path="/about" component={AboutPage} />
                    <Route name="Error" path="/error" component={ErrorPage} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
