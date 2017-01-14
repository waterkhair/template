// Modules
import React from 'react';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

class HomePage extends React.Component {
    render() {
        return (
            <div
                className={`page ${this.props.className ? this.props.className : ''}`}>
                <h1>
                    Home
                </h1>
                Hello {this.props.sessionState.user.name}!
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

export default connect(mapStateToProps)(muiThemeable()(HomePage));
