// Modules
import GroupIcon from 'material-ui/svg-icons/social/group';
import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';
import Subheader from 'material-ui/Subheader';

class AdminMenu extends React.Component {
    render() {
        return (
            <div>
                <Subheader>Administration</Subheader>
                <Link
                    onTouchTap={this.props.drawerToggle}
                    style={{textDecoration: 'none'}}
                    to="/users">
                    <MenuItem
                        leftIcon={
                            <GroupIcon />
                        }
                        primaryText="Users" />
                </Link>
            </div>
        );
    }
}

export default AdminMenu;
