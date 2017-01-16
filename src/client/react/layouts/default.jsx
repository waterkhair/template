// Modules
import AppToolbar from './containers/app_toolbar';
import Paper from 'material-ui/Paper';
import React from 'react';
import SessionActions from '../../redux/actions/session';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

class DefaultLayout extends React.Component {
    render() {
        if (this.props.sessionState.token === '') {
            window.location.reload(false);
        }

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
                            muiTheme={this.props.muiTheme}
                            signOutSuccess={this.props.signOutSuccess}
                            user={this.props.sessionState.user} />
                    </div>
                    <div
                        className="page-container row">
                        <div
                            className="col-xs-12 col-ms-12 col-md-12 col-lg-12">
                            {this.props.children}
                        </div>
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

const matchDispatchToProps = (dispatch) => bindActionCreators({
    signOutSuccess: SessionActions.signOutSuccess
}, dispatch);

export default muiThemeable()(connect(mapStateToProps, matchDispatchToProps)(DefaultLayout));
