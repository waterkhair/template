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
                <Subheader>Session</Subheader>
                <Link
                    onTouchTap={this.props.drawerToggle}
                    style={{textDecoration: 'none'}}
                    to="/profile">
                    <MenuItem
                        leftIcon={
                            <AccountCircleIcon />
                        }
                        primaryText="Profile" />
                </Link>
                <Link
                    onTouchTap={this.props.drawerToggle}
                    style={{textDecoration: 'none'}}
                    to="/settings">
                    <MenuItem
                        leftIcon={
                            <SettingsIcon />
                        }
                        primaryText="Settings" />
                </Link>
                <Link
                    onTouchTap={this.props.signOut}
                    style={{textDecoration: 'none'}}>
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

export default SessionMenu;
