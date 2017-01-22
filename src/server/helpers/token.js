// Modules
import Config from '../config/main';
import JWT from 'jsonwebtoken';

const createToken = (user, settings) => {
    const scopes = user.admin ? 'admin' : 'user';

    return JWT.sign({
        email: user.email,
        name: user.name,
        scope: scopes,
        settings,
        username: user.username
    },
    Config.SESSION.SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '1h'
    });
};

export default {
    createToken
};
