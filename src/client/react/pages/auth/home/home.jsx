// Modules
import React from 'react';
import connect from 'react-redux/lib/connect/connect';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    Home
                </h1>
                Hello {this.props.sessionState.credentials.name}!
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

export default connect(mapStateToProps)(HomePage);
