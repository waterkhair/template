// Modules
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class HomePage extends React.Component {
    render() {
        return (
            <h1 style={{
                color: this.props.muiTheme.palette.textColor
            }}>
                Home
            </h1>
        );
    }
}

export default muiThemeable()(HomePage);
