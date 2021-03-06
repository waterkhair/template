// Modules
import RadioButton from 'material-ui/RadioButton/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import React from 'react';
import SessionActions from '../../../../redux/actions/session';
import Subheader from 'material-ui/Subheader';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.onSettingChange = this.onSettingChangeHandler.bind(this);
    }

    onSettingChangeHandler(event) {
        const data = {
            theme: event.target.value
        };

        this.props.updateSettings({
            data,
            token: this.props.sessionState.token,
            username: this.props.sessionState.credentials.username
        });
    }

    render() {
        return (
            <div>
                <h1>
                    Settings
                </h1>
                <Subheader>
                    Theme
                </Subheader>
                <RadioButtonGroup
                    defaultSelected={this.props.sessionState.settings.theme}
                    name="theme"
                    onChange={this.onSettingChange}>
                    <RadioButton
                        label="Light"
                        value="light" />
                    <RadioButton
                        label="Dark"
                        value="dark" />
                </RadioButtonGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const mappedState = {
        sessionState: state.session
    };

    return mappedState;
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateSettings: SessionActions.updateSettings
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
