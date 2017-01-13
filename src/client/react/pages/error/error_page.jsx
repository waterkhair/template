// Modules
import Paper from 'material-ui/Paper';
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class HomePage extends React.Component {
    render() {
        return (
            <Paper
                className="page-paper col-xs-10 col-sm-8 col-md-6 col-lg-4"
                zDepth={3}>
                <h1>
                    Error
                </h1>
                Hello {this.props.sessionState.user.name}!
            </Paper>
        );
    }
}

export default muiThemeable()(HomePage);
