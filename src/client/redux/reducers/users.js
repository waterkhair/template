// Modules
import ACTION_TYPES from '../../const/action_types';

const getInitialState = () => Object.assign({}, {
    token: null,
    users: [{
        admin: false,
        email: '',
        name: '',
        username: ''
    }]
});

export default (state = getInitialState(), action) => {
    switch (action.type) {
    case ACTION_TYPES.GET_USERS_SUCCESS: {
        const users = [];

        action.users.forEach((user) => {
            users.push({
                admin: user.admin,
                email: user.email,
                name: user.name,
                username: user.username
            });
        });

        return {
            ...state,
            users
        };
    }
    default:
        return state;
    }
};
