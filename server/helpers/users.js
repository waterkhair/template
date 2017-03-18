// Modules
const BCryptJS = require('bcryptjs'),
    Boom = require('boom'),
    Config = require('../config/main'),
    HTTP_STATUS_CODES = require('../const/http_status_codes'),
    SessionHelper = require('./session'),
    Settings = require('../models/settings'),
    User = require('../models/user');

/**
 * Creates a user
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const createUser = (req, reply) => {
    const user = new User();
    user.admin = false;
    user.email = req.payload.email;
    user.name = req.payload.name;
    user.username = req.payload.username;

    BCryptJS.genSalt(Config.SESSION.SALT_NUMBER, (err, salt) => {
        if (err) {
            throw err;
        }

        BCryptJS.hash(req.payload.password, salt, (err, hash) => {
            if (err) {
                throw Boom.badData(err);
            }

            user.password = hash;
            user.save((err, user) => {
                if (err) {
                    throw Boom.badData(err);
                }

                const settings = new Settings();
                settings.theme = 'light';
                settings.username = user.username;
                settings.save((err) => {
                    if (err) {
                        throw Boom.badData(err);
                    }

                    reply({
                        payload: {
                            token: SessionHelper.createToken(user)
                        }
                    }).code(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
                });
            });
        });
    });
};

/**
 * Deletes a user
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const deleteUser = (req, reply) => {
    if (req.auth.credentials.username === req.payload.username) {
        User.findOneAndRemove({username: req.payload.username}, (err) => {
            if (err) {
                throw Boom.badData(err);
            }

            reply({
                payload: {
                    token: null
                }
            })
            .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
        });
    } else {
        reply(Boom.badData('Incorrect user delete'));
    }
};

/**
 * Get all users
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const getUsers = (req, reply) => {
    User.find()
        .select('-_id -password -__v')
        .exec((err, users) => {
            if (err) {
                throw Boom.badData(err);
            }
            if (!users.length) {
                throw Boom.notFound('No users found!');
            }
            reply({
                payload: {
                    users
                }
            })
            .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
        });
};

/**
 * Sets the role of a user
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const setUserRole = (req, reply) => {
    User.findOneAndUpdate({username: req.payload.username}, {admin: req.payload.admin}, (err) => {
        if (err) {
            throw Boom.badImplementation(err);
        }

        reply({
            payload: {
                user: {
                    admin: req.payload.admin,
                    username: req.payload.username
                }
            }
        })
        .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
    });
};

/**
 * Updates a user
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const updateUser = (req, reply) => {
    if (req.auth.credentials.username === req.payload.username) {
        if (req.payload.password) {
            BCryptJS.genSalt(Config.SESSION.SALT_NUMBER, (err, salt) => {
                if (err) {
                    throw Boom.badImplementation(err);
                }

                BCryptJS.hash(req.payload.password, salt, (err, hash) => {
                    if (err) {
                        throw Boom.badImplementation(err);
                    }

                    User.findOneAndUpdate({username: req.payload.username}, Object.assign(req.payload, {password: hash}), {new: true}, (err, user) => {
                        if (err) {
                            throw Boom.badImplementation(err);
                        }

                        reply({
                            payload: {
                                token: SessionHelper.createToken(user)
                            }
                        })
                        .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
                    });
                });
            });
        } else {
            User.findOneAndUpdate({username: req.payload.username}, req.payload, {new: true}, (err, user) => {
                if (err) {
                    throw Boom.badImplementation(err);
                }

                reply({
                    payload: {
                        token: SessionHelper.createToken(user)
                    }
                })
                .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
            });
        }
    } else {
        reply(Boom.badData('Incorrect user update'));
    }
};

/**
 * Verifies if a username and email is unique
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const verifyUniqueUser = (req, reply) => {
    User.findOne({
        $or: [{
            email: req.payload.email
        }, {
            username: req.payload.username
        }]
    },
    (err, user) => {
        if (err) {
            throw Boom.badImplementation(err);
        }

        if (user) {
            if (user.username === req.payload.username) {
                reply(Boom.conflict('Username taken'));
            }

            if (user.email === req.payload.email) {
                reply(Boom.conflict('Email taken'));
            }
        }

        reply(req.payload);
    });
};

module.exports = {
    createUser,
    deleteUser,
    getUsers,
    setUserRole,
    updateUser,
    verifyUniqueUser
};
