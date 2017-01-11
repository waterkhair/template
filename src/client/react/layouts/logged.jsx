// Modules
import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

class DefaultLayout extends React.Component {
    componentDidMount() {
        if (this.props.sessionState.token === '') {
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
    return {
        sessionState: state.session
    };
};

export default connect(mapStateToProps)(DefaultLayout);
