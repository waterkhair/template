// Modules
import config from '../../config/main';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

export default class DefaultLayout extends Component {
    render() {
        return (
            <div>
                <AppBar title={config.app.title} />
                {this.props.children}
            </div>
        );
    }
}
