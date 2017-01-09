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
            value: 'login'
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
                        label="Login"
                        value="login">
                        <form
                            action={this.props.onLogin}
                            className="login-form">
                            <TextField
                                fullWidth={true}
                                hintText="Username"
                                floatingLabelText="Username"
                                type="text" />
                            <TextField
                                className="col-xsd"
                                floatingLabelText="Password"
                                fullWidth={true}
                                hintText="Password"
                                type="password" />
                            <Checkbox
                                className="login-checkbox"
                                label="Remember Me" />
                            <RaisedButton
                                className="login-button"
                                fullWidth={true}
                                label="Login"
                                primary={true} />
                        </form>
                    </Tab>
                    <Tab
                        className="col-xs"
                        label="Sign Up"
                        value="sign-up">
                        <form
                            action={this.props.onSignIn}
                            className="login-form">
                            <TextField
                                hintText="Email"
                                floatingLabelText="Email"
                                fullWidth={true}
                                type="text" />
                            <TextField
                                hintText="Name"
                                floatingLabelText="Name"
                                fullWidth={true}
                                type="text" />
                            <TextField
                                hintText="Username"
                                floatingLabelText="Username"
                                fullWidth={true}
                                type="text" />
                            <TextField
                                className="col-xsd"
                                hintText="Password"
                                floatingLabelText="Password"
                                fullWidth={true}
                                type="password" />
                            <RaisedButton
                                className="login-button"
                                fullWidth={true}
                                label="Sing Up"
                                primary={true} />
                        </form>
                    </Tab>
                </Tabs>
            </Paper>
        );
    }
}

export default muiThemeable()(LoginPaper);
