// Modules
import React from 'react';
import {connect} from 'react-redux';

class DefaultLayout extends React.Component {
    render() {
        return (
            <div
                className="main-container row center-xs">
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const mappedState = {
        sessionState: state.session
    };

    return mappedState;
};

export default connect(mapStateToProps)(DefaultLayout);
