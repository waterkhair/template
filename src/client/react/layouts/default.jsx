// Modules
import React from 'react';
import appConfig from '../../config/app';

export default class DefaultLayout extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
