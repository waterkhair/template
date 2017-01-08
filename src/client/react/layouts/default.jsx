// Modules
import appConfig from '../../config/app';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

export default class DefaultLayout extends Component {
    render() {
        return (
            <div>
                <AppBar title={appConfig.title} />
                {this.props.children}
            </div>
        );
    }
}
