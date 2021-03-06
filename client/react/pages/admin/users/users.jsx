// Modules
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import React from 'react';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import UserActions from '../../../../redux/actions/users';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';
import muiThemeable from 'material-ui/styles/muiThemeable';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.getUsers({token: this.props.sessionState.token});

        this.onUserAdminToggle = this.onUserAdminToggleHandler.bind(this);
    }

    onUserAdminToggleHandler(username, admin) {
        this.props.setUserRole({
            data: {
                admin
            },
            token: this.props.sessionState.token,
            username
        });
    }

    getUsers() {
        return this.props.usersState.users.map((user, index) => {
            if (user.username !== '' && user.username !== this.props.sessionState.credentials.username) {
                return <ListItem
                            key={index}
                            leftAvatar={
                                <Avatar src="images/user_avatar.png" />
                            }
                            primaryText={user.name}
                            rightIcon={
                                <Toggle
                                    className="admin-toggle"
                                    defaultToggled={user.admin}
                                    onToggle={() => this.onUserAdminToggle(user.username, !user.admin)} />
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
                    className="align-left">
                    <Subheader>
                        Users
                    </Subheader>
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
