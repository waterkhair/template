// Modules
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import React from 'react';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import UserActions from '../../../redux/actions/users';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.sessionState.credentials.scope === 'admin') {
            this.props.getUsers(this.props.sessionState.token);
        }

        this.onUserAdminToggle = this.onUserAdminToggleHandle.bind(this);
    }

    onUserAdminToggleHandle(username, admin) {
        this.props.setUserRole(username, admin, this.props.sessionState.token);
    }

    getUsers() {
        return this.props.usersState.users.map((user, index) => {
            if (user.username !== '' && user.username !== this.props.sessionState.credentials.username) {
                return <ListItem
                            key={index}
                            primaryText={user.name}
                            leftAvatar={
                                <Avatar src="images/user_avatar.png" />
                            }
                            rightIcon={
                                <Toggle
                                    className="admin-toggle"
                                    defaultToggled={user.admin}
                                    onToggle={() => this.onUserAdminToggle(user.username, !user.admin)}
                                    style={{width: 45}} />
                            } />;
            }

            return null;
        });
    }

    render() {
        return (
            <div
                className="page-container">
                <h1>
                    Users
                </h1>
                <List
                    style={{textAlign: 'left'}}>
                    <Subheader>Users</Subheader>
                    {this.getUsers()}
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const mappedState = {
        sessionState: state.session,
        usersState: state.users
    };

    return mappedState;
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getUsers: UserActions.getUsers,
    setUserRole: UserActions.setUserRole
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(UsersPage));
