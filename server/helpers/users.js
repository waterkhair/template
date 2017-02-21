// Modules
const BCryptJS = require('bcryptjs'),
    Boom = require('boom'),
    Config = require('../config/main'),
    HTTP_STATUS_CODES = require('../const/http_status_codes'),
    SessionHelper = require('./session'),
    Settings = require('../models/settings'),
    User = require('../models/user');

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
                throw Boom.badRequest(err);
            }

            user.password = hash;
            user.save((err, user) => {
                if (err) {
                    throw Boom.badRequest(err);
                }

                const settings = new Settings();
                settings.theme = 'light';
                settings.username = user.username;
                settings.save((err) => {
                    if (err) {
                        throw Boom.badRequest(err);
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

const deleteUser = (req, reply) => {
    if (req.auth.credentials.username === req.payload.username) {
        User.findOneAndRemove({username: req.payload.username}, (err) => {
            if (err) {
                throw Boom.badRequest(err);
            }

            reply({
                payload: {
                    token: null
                }
            })
            .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
        });
    } else {
        reply(Boom.badRequest('Incorrect user delete'));
    }
};

const getUsers = (req, reply) => {
    User.find()
        .select('-_id -password -__v')
        .exec((err, users) => {
            if (err) {
                throw Boom.badRequest(err);
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

const setUserRole = (req, reply) => {
    User.findOneAndUpdate({username: req.payload.username}, {admin: req.payload.admin}, (err) => {
        if (err) {
            throw Boom.badRequest(err);
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

const updateUser = (req, reply) => {
    if (req.auth.credentials.username === req.payload.username) {
        if (req.payload.password) {
            BCryptJS.genSalt(Config.SESSION.SALT_NUMBER, (err, salt) => {
                if (err) {
                    throw err;
                }

                BCryptJS.hash(req.payload.password, salt, (err, hash) => {
                    if (err) {
                        throw Boom.badRequest(err);
                    }

                    User.findOneAndUpdate({username: req.payload.username}, Object.assign(req.payload, {password: hash}), {new: true}, (err, user) => {
                        if (err) {
                            throw Boom.badRequest(err);
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
                    throw Boom.badRequest(err);
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
        reply(Boom.badRequest('Incorrect user update'));
    }
};

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
            throw Boom.badRequest(err);
        }

        if (user) {
            if (user.username === req.payload.username) {
                reply(Boom.badRequest('Username taken'));
            }

            if (user.email === req.payload.email) {
                reply(Boom.badRequest('Email taken'));
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
