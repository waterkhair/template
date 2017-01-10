// Modules
import LoginPage from '../pages/login/login_page';
import React from 'react';
import {connect} from 'react-redux';

class DefaultLayout extends React.Component {
    render() {
        return (
            <div
                className="main-container row center-xs">
                {
                    this.props.sessionState.token === ''
                        ? <LoginPage />
                        : this.props.children
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sessionState: state.session
    };
};

export default connect(mapStateToProps)(DefaultLayout);
