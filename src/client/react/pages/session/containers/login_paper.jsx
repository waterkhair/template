// Modules
import {Tab, Tabs} from 'material-ui/Tabs';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import TextField from 'material-ui/TextField';

class LoginPaper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'sign-in'
        };

        this.onTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(value) {
        this.setState({
            value
        });
    }

    render() {
        return (
            <div
                className="row">
                <Paper
                    className="login-paper col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4"
                    zDepth={3}>
                    <Tabs
                        className="row"
                        onChange={this.onTabChange}
                        value={this.state.value}>
                        <Tab
                            className="col-xs"
                            label="Sign In"
                            value="sign-in">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    this.props.onSignIn(event.target.username.value, event.target.password.value);
                                }}
                                className="form">
                                <TextField
                                    fullWidth={true}
                                    hintText="Username"
                                    floatingLabelText="Username"
                                    name="username"
                                    type="text" />
                                <TextField
                                    className="col-xsd"
                                    floatingLabelText="Password"
                                    fullWidth={true}
                                    hintText="Password"
                                    name="password"
                                    type="password" />
                                <Checkbox
                                    className="sign-in-checkbox"
                                    label="Remember Me"
                                    name="rememberme" />
                                <RaisedButton
                                    className="form-button"
                                    fullWidth={true}
                                    label="Login"
                                    type="submit"
                                    primary={true} />
                            </form>
                        </Tab>
                        <Tab
                            className="col-xs"
                            label="Sign Up"
                            value="sign-up">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    this.props.onSignUp(event.target.email.value, event.target.name.value, event.target.username.value, event.target.password.value);
                                }}
                                className="form">
                                <TextField
                                    hintText="Email"
                                    floatingLabelText="Email"
                                    fullWidth={true}
                                    name="email"
                                    type="text" />
                                <TextField
                                    hintText="Name"
                                    floatingLabelText="Name"
                                    fullWidth={true}
                                    name="name"
                                    type="text" />
                                <TextField
                                    hintText="Username"
                                    floatingLabelText="Username"
                                    fullWidth={true}
                                    name="username"
                                    type="text" />
                                <TextField
                                    className="col-xsd"
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    fullWidth={true}
                                    name="password"
                                    type="password" />
                                <RaisedButton
                                    className="form-button"
                                    fullWidth={true}
                                    label="Sing Up"
                                    type="submit"
                                    primary={true} />
                            </form>
                        </Tab>
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

export default LoginPaper;
