// Modules
import AppToolbar from './containers/app_toolbar';
import {FIRST_INDEX} from '../../const/utils';
import NotificationsActions from '../../redux/actions/notifications';
import NotificationsSnackbar from './containers/notifications_snackbar';
import Paper from 'material-ui/Paper';
import React from 'react';
import SessionActions from '../../redux/actions/session';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiThemeable from 'material-ui/styles/muiThemeable';

class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);

        this.removeNotification = this.removeNotificationHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.sessionState.isAuthenticated) {
            this.props.history.push({
                pathname: '/'
            });
        }
    }

    getChildContext() {
        const currentTheme = this.props.sessionState.settings.theme === 'dark' ? getMuiTheme(darkBaseTheme) : getMuiTheme();

        return {
            muiTheme: currentTheme
        };
    }

    removeNotificationHandler() {
        this.props.removeNotification({
            code: this.props.notificationsState.notifications[FIRST_INDEX].code
        });
    }

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
                            credentials={this.props.sessionState.credentials}
                            history={this.props.history}
                            muiTheme={this.props.muiTheme}
                            signOutSuccess={this.props.signOutSuccess} />
                    </div>
                    <div
                        className="page-container row">
                        <div
                            className="col-xs-12 col-ms-12 col-md-12 col-lg-12">
                            {this.props.children}
                        </div>
                    </div>
                    <NotificationsSnackbar
                        notifications={this.props.notificationsState.notifications}
                        removeNotification={this.removeNotification} />
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
        notificationsState: state.notifications,
        sessionState: state.session
    };

    return mappedState;
};

const matchDispatchToProps = (dispatch) => bindActionCreators({
    removeNotification: NotificationsActions.removeNotification,
    signOutSuccess: SessionActions.signOutSuccess
}, dispatch);

export default muiThemeable()(connect(mapStateToProps, matchDispatchToProps)(DefaultLayout));
