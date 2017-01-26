// Modules
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const FIRST_INDEX = 0;

class NotificationsSnackbar extends React.Component {
    getNotifications() {
        return this.props.notifications.map((notification, index) =>
            <div key={index}>
                <span>{notification.message}</span> <span>({notification.code})</span>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Snackbar
                    open={this.props.notifications.length > FIRST_INDEX}
                    message={this.props.notifications.length > FIRST_INDEX ? this.props.notifications[FIRST_INDEX].message : ''}
                    autoHideDuration={this.props.notifications.length > FIRST_INDEX ? this.props.notifications[FIRST_INDEX].milliseconds : FIRST_INDEX}
                    onRequestClose={this.props.removeNotification} />
            </div>
        );
    }
}

NotificationsSnackbar.propTypes = {
    notifications: React.PropTypes.array.isRequired,
    removeNotification: React.PropTypes.func.isRequired
};

export default NotificationsSnackbar;
