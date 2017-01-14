// Modules
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import AdminMenu from './admin_menu';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import React from 'react';
import UserMenu from './user_menu';
import {connect} from 'react-redux';

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
                className={`app-toolbar ${this.props.className ? this.props.className : ''}`}
                style={{backgroundColor: this.props.muiTheme.palette.primary1Color}}>
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
                        <UserMenu
                            drawerToggle={this.drawerToggle} />
                        {this.props.sessionState.user.scope === 'admin'
                            ? <AdminMenu
                                  drawerToggle={this.drawerToggle} />
                            : null}
                    </Drawer>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = (state) => {
    const mappedState = {
        sessionState: state.session
    };

    return mappedState;
};

export default connect(mapStateToProps)(AppToolbar);
