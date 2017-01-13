// Modules
import Paper from 'material-ui/Paper';
import React from 'react';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

class HomePage extends React.Component {
    render() {
        return (
            <Paper
                className="page-paper col-xs-10 col-sm-8 col-md-6 col-lg-4"
                zDepth={3}>
                <h1>
                    Home
                </h1>
                Hello {this.props.sessionState.user.name}!
            </Paper>
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
