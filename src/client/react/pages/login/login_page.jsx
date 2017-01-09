// Modules
import LoginPaper from './components/login_paper';
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class HomePage extends React.Component {
    render() {
        return (
            <LoginPaper />
        );
    }
}

export default muiThemeable()(HomePage);
