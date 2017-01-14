// Modules
import {IndexLink, Link} from 'react-router';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import GroupIcon from 'material-ui/svg-icons/social/group';
import HelpIcon from 'material-ui/svg-icons/action/help';
import HomeIcon from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';

class AppToolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false
        };

        this.drawerToggle = this.drawerToggleHandle.bind(this);
        this.onDrawerRequestChange = this.onDrawerRequestChangeHandle.bind(this);
    }

    drawerToggleHandle() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    onDrawerRequestChangeHandle(drawerOpen) {
        this.setState({
            drawerOpen
        });
    }

    render() {
        return (
            <Toolbar
                className={`app-toolbar ${this.props.className ? this.props.className : ''}`}>
                <ToolbarGroup
                    firstChild={true}>
                    <IconButton
                        onTouchTap={this.drawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        docked={false}
                        onRequestChange={this.onDrawerRequestChange}
                        open={this.state.drawerOpen}
                        width={200}>
                        <AppBar
                            title="Menu"
                            showMenuIconButton={false} />
                        <IndexLink
                            onTouchTap={this.drawerToggle}
                            style={{textDecoration: 'none'}}
                            to="/">
                            <MenuItem
                                leftIcon={
                                    <HomeIcon />
                                }
                                primaryText="Home" />
                        </IndexLink>
                        <Link
                            onTouchTap={this.drawerToggle}
                            style={{textDecoration: 'none'}}
                            to="/about">
                            <MenuItem
                                leftIcon={
                                    <HelpIcon />
                                }
                                primaryText="About" />
                        </Link>
                        <Link
                            onTouchTap={this.drawerToggle}
                            style={{textDecoration: 'none'}}
                            to="/users">
                            <MenuItem
                                leftIcon={
                                    <GroupIcon />
                                }
                                primaryText="Users" />
                        </Link>
                    </Drawer>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default AppToolbar;
