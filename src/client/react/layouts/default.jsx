// Modules
import React from 'react';
import appConfig from '../../config/app';

const style = {
    padding: 50
};

export default class DefaultLayout extends React.Component {
    render() {
        return (
            <div
                className="row center-xs"
                style={style}>
                {this.props.children}
            </div>
        );
    }
}
