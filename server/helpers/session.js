// Modules
const BCryptJS = require('bcryptjs'),
    Boom = require('boom'),
    Config = require('../config/main'),
    HTTP_STATUS_CODES = require('../const/http_status_codes'),
    JWT = require('jsonwebtoken'),
    User = require('../models/user');

/**
 * Returns a signed token using a credentials object
 * @param {object} credentials - Object containing email, name, admin and username
 * @returns {string} token
 */
const createToken = (credentials) => JWT.sign({
    email: credentials.email,
    name: credentials.name,
    scope: credentials.admin ? 'admin' : 'user',
    username: credentials.username
},
Config.SESSION.SECRET_KEY, {
    algorithm: Config.SESSION.SESESSION_ALGORITHM,
    expiresIn: Config.SESSION.SESESSION_EXPIRATION
});

/**
 * Starts a user session
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const login = (req, reply) => {
    reply({
        payload: {
            token: createToken(req.pre.credentials)
        }
    })
    .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
};

/**
 * Authenticates a user
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const verifyCredentials = (req, reply) => {
    User.findOne({
        $or: [{
            email: req.payload.email
        }, {
            username: req.payload.username
        }]
    },
    (err, user) => {
        if (err) {
            reply(Boom.badImplementation(err));
        }

        if (user) {
            BCryptJS.compare(req.payload.password, user.password, (err, isValid) => {
                if (err) {
                    reply(Boom.badImplementation(err));
                }

                if (isValid) {
                    reply(user);
                } else {
                    reply(Boom.unauthorized('Incorrect password'));
                }
            });
        } else {
            reply(Boom.unauthorized('Incorrect username or email'));
        }
    });
};

module.exports = {
    createToken,
    login,
    verifyCredentials
};
