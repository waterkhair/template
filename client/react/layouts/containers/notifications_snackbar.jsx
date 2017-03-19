// Modules
import {FIRST_INDEX} from '../../../const/utils';
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class NotificationsSnackbar extends React.Component {
    getNotifications() {
        return this.props.notifications.map((notification, index) =>
            <div
                key={index}>
                <span>{notification.message}</span> <span>({notification.code})</span>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Snackbar
                    autoHideDuration={this.props.notifications.length > FIRST_INDEX ? this.props.notifications[FIRST_INDEX].milliseconds : FIRST_INDEX}
                    message={this.props.notifications.length > FIRST_INDEX ? this.props.notifications[FIRST_INDEX].message : ''}
                    onRequestClose={this.props.removeNotification}
                    open={this.props.notifications.length > FIRST_INDEX} />
            </div>
        );
    }
}

NotificationsSnackbar.propTypes = {
    notifications: React.PropTypes.array.isRequired,
    removeNotification: React.PropTypes.func.isRequired
};

export default NotificationsSnackbar;
