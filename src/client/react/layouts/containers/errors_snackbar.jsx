// Modules
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const FIRST_INDEX = 0;

class ErrorsSnackbar extends React.Component {
    getErrors() {
        return this.props.errors.map((error, index) =>
            <div key={index}>
                <span>{error.message}</span> <span>({error.code})</span>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Snackbar
                    open={this.props.errors.length > FIRST_INDEX}
                    message={this.props.errors.length > FIRST_INDEX ? this.props.errors[FIRST_INDEX].message : ''}
                    autoHideDuration={this.props.errors.length > FIRST_INDEX ? this.props.errors[FIRST_INDEX].milliseconds : FIRST_INDEX}
                    onRequestClose={this.props.removeError} />
            </div>
        );
    }
}

export default ErrorsSnackbar;
