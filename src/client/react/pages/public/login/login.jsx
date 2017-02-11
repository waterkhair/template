// Modules
import LoginPaper from './containers/login_paper';
import NotificationsActions from '../../../../redux/actions/notifications';
import NotificationsSnackbar from '../../../layouts/containers/notifications_snackbar';
import React from 'react';
import SessionActions from '../../../../redux/actions/session';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

const FIRST_INDEX = 0;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.removeNotification = this.removeNotificationHandler.bind(this);
    }

    componentDidUpdate() {
        if (this.props.sessionState.isAuthenticated) {
            this.props.getSettings({token: this.props.sessionState.token});
            browserHistory.push(this.props.sessionState.navigation.loginLocation);
        }
    }

    removeNotificationHandler() {
        this.props.removeNotification({
            code: this.props.notificationsState.notifications[FIRST_INDEX].code
        });
    }

    render() {
        return (
            <div>
                <LoginPaper
                    onSignIn={this.props.signIn}
                    onSignUp={this.props.signUp}
                    token={this.props.sessionState.token} />
                <NotificationsSnackbar
                    notifications={this.props.notificationsState.notifications}
                    removeNotification={this.removeNotification} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const mappedState = {
        notificationsState: state.notifications,
        sessionState: state.session
    };

    return mappedState;
};

const matchDispatchToProps = (dispatch) => bindActionCreators({
    getSettings: SessionActions.getSettings,
    removeNotification: NotificationsActions.removeNotification,
    signIn: SessionActions.signIn,
    signUp: SessionActions.signUp
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage);
