// Modules
import React from 'react';
import SessionActions from '../../redux/actions/session';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

class AdminLayout extends React.Component {
    componentDidMount() {
        if (this.props.sessionState.token === '' || this.props.sessionState.user.scope !== 'admin') {
            this.props.setPreviousUrl(this.props.location.pathname);
            browserHistory.push('/login');
        }
    }

    render() {
        if (this.props.sessionState.token === '') {
            return null;
        }

        return this.props.children;
    }
}

const mapStateToProps = (state) => {
    const mappedState = {
        sessionState: state.session
    };

    return mappedState;
};

const matchDispatchToProps = (dispatch) => bindActionCreators({
    setPreviousUrl: SessionActions.setPreviousUrl
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(AdminLayout);
