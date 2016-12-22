// Modules
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DefaultLayout from './layouts/default';
import HomePage from './pages/home/home';
import AboutPage from './pages/about/about';
import epics from '../redux/epics/epics';
import reducers from '../redux/reducers/reducers';

const epicMiddleware = createEpicMiddleware(epics);
const store = createStore(reducers, applyMiddleware(epicMiddleware));

injectTapEventPlugin();

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory}>
                <Route path="/" component={DefaultLayout}>
                    <IndexRoute name="Home" component={HomePage} />
                    <Route name="About" path="/about" component={AboutPage} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
