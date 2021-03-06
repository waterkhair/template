// Modules
import {FIRST_INDEX, NEXT_INDEX} from '../../const/utils';
import ACTION_TYPES from '../../const/action_types';

/**
 * Creates the initial users redux state
 * @return {object} Returns initial users redux state
 */
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
    case ACTION_TYPES.USERS.GET_USERS_SUCCESS: {
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
    case ACTION_TYPES.USERS.SET_USER_ROLE_SUCCESS: {
        let userIndex = 0;

        for (let iteration = 0; iteration < state.users.length; iteration++) {
            if (state.users[iteration].username === action.user.username) {
                userIndex = iteration;
                break;
            }
        }

        return {
            ...state,
            users: [
                ...state.users.slice(FIRST_INDEX, userIndex),
                Object.assign(state.users.slice(userIndex, userIndex + NEXT_INDEX)[FIRST_INDEX], {admin: action.user.admin}),
                ...state.users.slice(userIndex + NEXT_INDEX)
            ]
        };
    }
    default:
        return state;
    }
};
