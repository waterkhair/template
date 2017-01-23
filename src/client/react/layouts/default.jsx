// Modules
import AppToolbar from './containers/app_toolbar';
import ErrorsActions from '../../redux/actions/errors';
import ErrorsSnackbar from './containers/errors_snackbar';
import Paper from 'material-ui/Paper';
import React from 'react';
import SessionActions from '../../redux/actions/session';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiThemeable from 'material-ui/styles/muiThemeable';

const FIRST_INDEX = 0;

class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);

        this.removeError = this.removeErrorHandle.bind(this);
    }

    getChildContext() {
        const currentTheme = this.props.sessionState.settings.theme === 'dark' ? getMuiTheme(darkBaseTheme) : getMuiTheme();

        return {
            muiTheme: currentTheme
        };
    }

    removeErrorHandle() {
        this.props.removeError(this.props.errorsState.errors[FIRST_INDEX].code);
    }

    render() {
        if (!this.props.sessionState.credentials.isAuthenticated) {
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
                            credentials={this.props.sessionState.credentials} />
                    </div>
                    <div
                        className="page-container row">
                        <div
                            className="col-xs-12 col-ms-12 col-md-12 col-lg-12">
                            {this.props.children}
                        </div>
                    </div>
                    <ErrorsSnackbar
                        errors={this.props.errorsState.errors}
                        removeError={this.removeError} />
                </Paper>
            </div>
        );
    }
}

DefaultLayout.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const mappedState = {
        errorsState: state.errors,
        sessionState: state.session
    };

    return mappedState;
};

const matchDispatchToProps = (dispatch) => bindActionCreators({
    removeError: ErrorsActions.removeError,
    signOutSuccess: SessionActions.signOutSuccess
}, dispatch);

export default muiThemeable()(connect(mapStateToProps, matchDispatchToProps)(DefaultLayout));
