// Modules
import {Tabs, Tab} from 'material-ui/Tabs';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';

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
            <Paper
                className="col-xs-10 col-sm-8 col-md-6 col-lg-4"
                style={{
                    minWidth: 300
                }}
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
                            className="sign-in-form">
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
                                className="sign-in-button"
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
                            className="sign-up-form">
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
                                className="sign-up-button"
                                fullWidth={true}
                                label="Sing Up"
                                type="submit"
                                primary={true} />
                        </form>
                    </Tab>
                </Tabs>
            </Paper>
        );
    }
}

export default muiThemeable()(LoginPaper);
