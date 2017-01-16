// Modules
import React from 'react';
import {connect} from 'react-redux';

class SettingsPage extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    Settings
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

export default connect(mapStateToProps)(SettingsPage);
