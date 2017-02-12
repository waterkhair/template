// Modules
import GroupIcon from 'material-ui/svg-icons/social/group';
import Link from 'react-router/lib/Link';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';
import Subheader from 'material-ui/Subheader';

class AdminMenu extends React.Component {
    render() {
        return (
            <div>
                <Subheader>
                    Administration
                </Subheader>
                <Link
                    className="no-text-decoration"
                    onTouchTap={this.props.drawerToggle}
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

AdminMenu.propTypes = {
    drawerToggle: React.PropTypes.func.isRequired
};

export default AdminMenu;
