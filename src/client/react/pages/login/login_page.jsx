// Modules
import LoginPaper from './components/login_paper';
import React from 'react';
import SessionActions from '../../../redux/actions/session';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

class HomePage extends React.Component {
    componentDidUpdate() {
        if (this.props.sessionState.user && this.props.sessionState.user.name) {
            browserHistory.goBack();
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
    return {
        sessionState: state.session
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signIn: SessionActions.signIn,
        signUp: SessionActions.signUp
    },
    dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(muiThemeable()(HomePage));
