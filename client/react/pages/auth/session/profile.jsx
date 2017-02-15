// Modules
import ProfileForm from './containers/profile_form';
import React from 'react';
import SessionActions from '../../../../redux/actions/session';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailEdited: false,
            nameEdited: false,
            passwordEdited: false
        };

        this.onProfileEdited = this.onProfileEditedHandle.bind(this);
        this.onUpdateProfile = this.onUpdateProfileHandle.bind(this);
    }

    onProfileEditedHandle(field) {
        switch (field) {
        case 'email':
            this.setState({
                ...this.state,
                emailEdited: true
            });
            break;
        case 'name':
            this.setState({
                ...this.state,
                nameEdited: true
            });
            break;
        case 'password':
            this.setState({
                ...this.state,
                passwordEdited: true
            });
            break;
        case 'username':
            this.setState({
                ...this.state,
                usernameEdited: true
            });
            break;
        default:
            break;
        }
    }

    onUpdateProfileHandle(event) {
        if (this.state.emailEdited || this.state.nameEdited || this.state.passwordEdited) {
            const data = {
                username: event.target.username_update.value
            };

            if (this.state.emailEdited) {
                data.email = event.target.email_update.value;
            }

            if (this.state.nameEdited) {
                data.name = event.target.name_update.value;
            }

            if (this.state.passwordEdited) {
                data.password = event.target.password_update.value;
            }

            this.props.updateProfile({
                data,
                token: this.props.sessionState.token
            });
        }
    }

    render() {
        return (
            <div>
                <h1>
                    Profile
                </h1>
                <ProfileForm
                    onProfileEdited={this.onProfileEdited}
                    onUpdateProfile={this.onUpdateProfile}
                    user={this.props.sessionState.credentials} />
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

const matchDispatchToProps = (dispatch) => bindActionCreators({
    updateProfile: SessionActions.updateProfile
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(ProfilePage);
