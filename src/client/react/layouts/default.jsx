// Modules
import AppBar from 'material-ui/AppBar';
import React from 'react';
import appConfig from '../../config/app';

export default class DefaultLayout extends React.Component {
    render() {
        return (
            <div>
                <AppBar title={appConfig.title} />
                {this.props.children}
            </div>
        );
    }
}
