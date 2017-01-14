// Modules
import {IndexLink, Link} from 'react-router';
import HelpIcon from 'material-ui/svg-icons/action/help';
import HomeIcon from 'material-ui/svg-icons/action/home';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';
import Subheader from 'material-ui/Subheader';

class UserMenu extends React.Component {
    render() {
        return (
            <div>
                <Subheader>Menu</Subheader>
                <IndexLink
                    onTouchTap={this.props.drawerToggle}
                    style={{textDecoration: 'none'}}
                    to="/">
                    <MenuItem
                        leftIcon={
                            <HomeIcon />
                        }
                        primaryText="Home" />
                </IndexLink>
                <Link
                    onTouchTap={this.props.drawerToggle}
                    style={{textDecoration: 'none'}}
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

export default UserMenu;