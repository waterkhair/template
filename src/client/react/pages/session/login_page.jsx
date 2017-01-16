// Modules
import LoginPaper from './containers/login_paper';
import React from 'react';
import SessionActions from '../../../redux/actions/session';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

class LoginPage extends React.Component {
    componentDidUpdate() {
        if (this.props.sessionState.user.scope === 'user' || this.props.sessionState.user.scope === 'admin') {
            browserHistory.push(this.props.sessionState.navigation.loginLocation);
        }
    }

    render() {
        return (
            <LoginPaper
                onSignIn={this.props.signIn}
                onSignUp={this.props.signUp} />
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
    signIn: SessionActions.signIn,
    signUp: SessionActions.signUp
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage);
