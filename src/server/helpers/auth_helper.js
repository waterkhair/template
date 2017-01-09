// Modules
import Bcrypt from 'bcrypt';
import UsersDB from '../data/users';

const authenticate = (request, username, password, callback) => {
    const user = UsersDB[username];

    if (!user) {
        return callback(null, false);
    }

    return Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, {
            id: user.id,
            name: user.name
        });
    });
};

export default {
    authenticate
};
