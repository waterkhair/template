// Modules
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import React from 'react';
import Subheader from 'material-ui/Subheader';
import UserActions from '../../../redux/actions/users';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.sessionState.user.scope === 'admin') {
            this.props.getUsers(this.props.sessionState.token);
        }
    }

    getUsers() {
        return this.props.usersState.users.map((user, index) => {
            if (user.username !== '') {
                return <ListItem
                            key={index}
                            primaryText={user.name}
                            leftAvatar={<Avatar src="images/ok-128.jpg" />}
                            rightIcon={<CommunicationChatBubble />} />;
            }

            return null;
        });
    }

    render() {
        return (
            <div
                className="page">
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
    getUsers: UserActions.getUsers
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(UsersPage));
