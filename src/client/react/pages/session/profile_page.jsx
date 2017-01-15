// Modules
import React from 'react';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

class ProfilePage extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    Profile
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

export default connect(mapStateToProps)(muiThemeable()(ProfilePage));
