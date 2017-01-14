// Modules
import AppToolbar from './containers/app_toolbar';
import Paper from 'material-ui/Paper';
import React from 'react';
import {connect} from 'react-redux';

const menuItems = [{
    route: '/',
    text: 'Home'
}, {
    route: '/about',
    text: 'About'
}, {
    route: '/users',
    text: 'Users'
}];

class DefaultLayout extends React.Component {
    render() {
        return (
            <div
                className="row">
                <Paper
                    className="container col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4"
                    zDepth={3}>
                    <div
                        className="row">
                        <AppToolbar
                            className="col-xs-12 col-ms-12 col-md-12 col-lg-12"
                            menuItems={menuItems} />
                    </div>
                    <div
                        className="row">
                        {this.props.children}
                    </div>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const mappedState = {
        sessionState: state.session
    };

    return mappedState;
};

export default connect(mapStateToProps)(DefaultLayout);
