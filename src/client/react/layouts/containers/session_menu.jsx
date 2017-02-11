// Modules
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import PowerSettingsNewIcon from 'material-ui/svg-icons/action/power-settings-new';
import React from 'react';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import Subheader from 'material-ui/Subheader';

class SessionMenu extends React.Component {
    render() {
        return (
            <div>
                <Subheader>
                    Session
                </Subheader>
                <Link
                    className="no-text-decoration"
                    onTouchTap={this.props.drawerToggle}
                    to="/profile">
                    <MenuItem
                        leftIcon={
                            <AccountCircleIcon />
                        }
                        primaryText="Profile" />
                </Link>
                <Link
                    className="no-text-decoration"
                    onTouchTap={this.props.drawerToggle}
                    to="/settings">
                    <MenuItem
                        leftIcon={
                            <SettingsIcon />
                        }
                        primaryText="Settings" />
                </Link>
                <Link
                    className="no-text-decoration"
                    onTouchTap={this.props.signOut}>
                    <MenuItem
                        leftIcon={
                            <PowerSettingsNewIcon />
                        }
                        primaryText="Log Out" />
                </Link>
            </div>
        );
    }
}

SessionMenu.propTypes = {
    drawerToggle: React.PropTypes.func.isRequired,
    signOut: React.PropTypes.func.isRequired
};

export default SessionMenu;
