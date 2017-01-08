import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class HomePage extends Component {
    render() {
        return (
            <h1 style={ { color: this.props.muiTheme.palette.textColor } }>
                Error
            </h1>
        );
    }
}

export default muiThemeable()(HomePage);
