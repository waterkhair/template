// Modules
import ErrorsActions from '../../../redux/actions/errors';
import ErrorsSnackbar from '../../layouts/containers/errors_snackbar';
import LoginPaper from './containers/login_paper';
import React from 'react';
import SessionActions from '../../../redux/actions/session';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

const FIRST_INDEX = 0;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.removeError = this.removeErrorHandle.bind(this);
    }

    componentDidUpdate() {
        if (this.props.sessionState.credentials.scope === 'user' || this.props.sessionState.credentials.scope === 'admin') {
            browserHistory.push(this.props.sessionState.navigation.loginLocation);
        }
    }

    removeErrorHandle() {
        this.props.removeError(this.props.errorsState.errors[FIRST_INDEX].code);
    }

    render() {
        return (
            <div>
                <LoginPaper
                    onSignIn={this.props.signIn}
                    onSignUp={this.props.signUp} />
                <ErrorsSnackbar
                    errors={this.props.errorsState.errors}
                    removeError={this.removeError} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const mappedState = {
        errorsState: state.errors,
        sessionState: state.session
    };

    return mappedState;
};

const matchDispatchToProps = (dispatch) => bindActionCreators({
    removeError: ErrorsActions.removeError,
    signIn: SessionActions.signIn,
    signUp: SessionActions.signUp
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage);
