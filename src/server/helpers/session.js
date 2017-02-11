// Modules
import BCryptJS from 'bcryptjs';
import Boom from 'boom';
import Config from '../config/main';
import HTTP_STATUS_CODES from '../const/http_status_codes';
import JWT from 'jsonwebtoken';
import Settings from '../models/settings';
import User from '../models/user';

const createToken = (credentials) => JWT.sign({
    email: credentials.email,
    name: credentials.name,
    scope: credentials.admin ? 'admin' : 'user',
    username: credentials.username
},
Config.SESSION.SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '1h'
});

const getToken = (req, reply) => {
    reply({
        payload: {
            token: createToken(req.pre.credentials)
        }
    })
    .code(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
};

const registerUser = (req, reply) => {
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
                            token: createToken(user)
                        }
                    }).code(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
                });
            });
        });
    });
};

const updateProfile = (req, reply) => {
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
                                token: createToken(user)
                            }
                        })
                        .code(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
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
                        token: createToken(user)
                    }
                })
                .code(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
            });
        }
    } else {
        reply(Boom.badRequest('Incorrect profile update!'));
    }
};

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
            reply(Boom.badRequest(err));
        }

        if (user) {
            BCryptJS.compare(req.payload.password, user.password, (err, isValid) => {
                if (err) {
                    reply(Boom.badRequest(err));
                }

                if (isValid) {
                    reply(user);
                } else {
                    reply(Boom.badRequest('Incorrect password!'));
                }
            });
        } else {
            reply(Boom.badRequest('Incorrect username or email!'));
        }
    });
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

export default {
    getToken,
    registerUser,
    updateProfile,
    verifyCredentials,
    verifyUniqueUser
};
