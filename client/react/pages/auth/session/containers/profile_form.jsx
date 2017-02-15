// Modules
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import TextField from 'material-ui/TextField';

class ProfileForm extends React.Component {
    render() {
        return (
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    this.props.onUpdateProfile(event);
                }}>
                <TextField
                    defaultValue={this.props.user.email}
                    floatingLabelText="Email"
                    fullWidth={true}
                    name="email_update"
                    onChange={() => this.props.onProfileEdited('email')}
                    type="text" />
                <TextField
                    defaultValue={this.props.user.name}
                    floatingLabelText="Name"
                    fullWidth={true}
                    name="name_update"
                    onChange={() => this.props.onProfileEdited('name')}
                    type="text" />
                <TextField
                    defaultValue={this.props.user.username}
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
                    onChange={() => this.props.onProfileEdited('password')}
                    type="password" />
                <RaisedButton
                    className="form-button"
                    fullWidth={true}
                    label="Update"
                    primary={true}
                    type="submit" />
            </form>
        );
    }
}

export default ProfileForm;
