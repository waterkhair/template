// Modules
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import SessionActions from '../../../redux/actions/session';
import TextField from 'material-ui/TextField';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailEdited: false,
            nameEdited: false,
            passwordEdited: false
        };

        this.onProfileEdited = this.onProfileEditedHandle.bind(this);
        this.onUpdateProfile = this.onUpdateProfileHandle.bind(this);
    }

    onProfileEditedHandle(field) {
        switch (field) {
        case 'email':
            this.setState({
                ...this.state,
                emailEdited: true
            });
            break;
        case 'name':
            this.setState({
                ...this.state,
                nameEdited: true
            });
            break;
        case 'password':
            this.setState({
                ...this.state,
                passwordEdited: true
            });
            break;
        case 'username':
            this.setState({
                ...this.state,
                usernameEdited: true
            });
            break;
        default:
            break;
        }
    }

    onUpdateProfileHandle(event) {
        if (this.state.emailEdited || this.state.nameEdited || this.state.passwordEdited) {
            const userEdited = {
                username: event.target.username_update.value
            };

            if (this.state.emailEdited) {
                userEdited.email = event.target.email_update.value;
            }

            if (this.state.nameEdited) {
                userEdited.name = event.target.name_update.value;
            }

            if (this.state.passwordEdited) {
                userEdited.password = event.target.password_update.value;
            }

            this.props.updateProfile(userEdited, this.props.sessionState.token);
        }
    }

    render() {
        return (
            <div>
                <h1>
                    Profile
                </h1>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        this.onUpdateProfile(event);
                    }}
                    className="sign-up-form">
                    <TextField
                        defaultValue={this.props.sessionState.user.email}
                        floatingLabelText="Email"
                        fullWidth={true}
                        name="email_update"
                        onChange={() => this.onProfileEdited('email')}
                        type="text" />
                    <TextField
                        defaultValue={this.props.sessionState.user.name}
                        floatingLabelText="Name"
                        fullWidth={true}
                        name="name_update"
                        onChange={() => this.onProfileEdited('name')}
                        type="text" />
                    <TextField
                        defaultValue={this.props.sessionState.user.username}
                        disabled={true}
                        floatingLabelText="Username"
                        fullWidth={true}
                        name="username_update"
                        type="text" />
                    <TextField
                        className="col-xsd"
                        floatingLabelText="Password"
                        fullWidth={true}
                        name="password_update"
                        onChange={() => this.onProfileEdited('password')}
                        type="password" />
                    <RaisedButton
                        className="update-profile-button"
                        fullWidth={true}
                        label="Update"
                        type="submit"
                        primary={true} />
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const mappedState = {
        sessionState: state.session
    };

    return mappedState;
};

const matchDispatchToProps = (dispatch) => bindActionCreators({
    updateProfile: SessionActions.updateProfile
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(muiThemeable()(ProfilePage));
