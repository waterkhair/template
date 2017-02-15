// Modules
import AdminMenu from './admin_menu';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import React from 'react';
import SessionMenu from './session_menu';
import UserMenu from './user_menu';
import browserHistory from 'react-router/lib/browserHistory';

class AppToolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false
        };

        this.drawerToggle = this.drawerToggleHandle.bind(this);
        this.onDrawerRequestChange = this.onDrawerRequestChangeHandle.bind(this);
        this.signOut = this.signOutHandle.bind(this);
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

    signOutHandle() {
        this.props.signOutSuccess();
        browserHistory.push('/');
    }

    render() {
        return (
            <AppBar
                className={`app-toolbar ${this.props.className ? this.props.className : ''}`}
                title="Template"
                iconElementLeft={
                    <IconButton
                        onTouchTap={this.drawerToggle}>
                        <MenuIcon />
                    </IconButton>
                }>
                <Drawer
                    docked={false}
                    onRequestChange={this.onDrawerRequestChange}
                    open={this.state.drawerOpen}
                    width={200}>
                    <UserMenu
                        drawerToggle={this.drawerToggle} />
                    {this.props.credentials.scope === 'admin'
                        ? <AdminMenu
                            drawerToggle={this.drawerToggle} />
                        : null}
                    <SessionMenu
                        drawerToggle={this.drawerToggle}
                        signOut={this.signOut} />
                </Drawer>
            </AppBar>
        );
    }
}

AppToolbar.propTypes = {
    className: React.PropTypes.string,
    credentials: React.PropTypes.object.isRequired,
    muiTheme: React.PropTypes.object.isRequired,
    signOutSuccess: React.PropTypes.func.isRequired
};

export default AppToolbar;