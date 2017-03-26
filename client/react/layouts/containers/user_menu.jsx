// Modules
import HelpIcon from 'material-ui/svg-icons/action/help';
import HomeIcon from 'material-ui/svg-icons/action/home';
import Link from 'react-router-dom/Link';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';
import Subheader from 'material-ui/Subheader';

class UserMenu extends React.Component {
    render() {
        return (
            <div>
                <Subheader>
                    Menu
                </Subheader>
                <Link
                    className="no-text-decoration"
                    onTouchTap={this.props.drawerToggle}
                    to="/">
                    <MenuItem
                        leftIcon={
                            <HomeIcon />
                        }
                        primaryText="Home" />
                </Link>
                <Link
                    className="no-text-decoration"
                    onTouchTap={this.props.drawerToggle}
                    to="/about">
                    <MenuItem
                        leftIcon={
                            <HelpIcon />
                        }
                        primaryText="About" />
                </Link>
            </div>
        );
    }
}

UserMenu.propTypes = {
    drawerToggle: React.PropTypes.func.isRequired
};

export default UserMenu;
