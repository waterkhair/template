// Modules
import BCryptJS from 'bcryptjs';
import Boom from 'boom';
import Config from '../config/main';
import HTTP_STATUS_CODES from '../const/http_status_codes';
import JWT from 'jsonwebtoken';
import Settings from '../models/settings';
import User from '../models/user';

const createToken = (user) => JWT.sign({
    isAuthenticated: true,
    scope: user.admin ? 'admin' : 'user',
    username: user.username
},
Config.SESSION.SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '1h'
});

const getProfile = (req, reply) => {
    User.findOne({username: req.payload.username})
        .select('-_id -password -__v')
        .exec((err, user) => {
            if (err) {
                reply(Boom.badRequest(err));
            }

            reply({
                profile: {
                    email: user.email,
                    name: user.name
                }
            })
            .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
        });
};

const getToken = (req, reply) => {
    reply({
        token: createToken(req.pre.user)
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
                        token: createToken(user)
                    }).code(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
                });
            });
        });
    });
};

const updateProfile = (req, reply) => {
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
                        token: createToken(user)
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
                token: createToken(user)
            })
            .code(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
        });
    }
};

const updateSettings = (req, reply) => {
    Settings.findOneAndUpdate({username: req.payload.username}, req.payload, {new: true}, (err, settings) => {
        if (err) {
            throw Boom.badRequest(err);
        }

        reply({
            settings
        })
        .code(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
    });
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

const verifySession = (req, reply) => {
    console.log(req.payload);
    if (req.auth.credentials.username === req.payload.username) {
        reply(req.payload);
    } else {
        reply(Boom.badRequest('Incorrect profile update!'));
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

export default {
    getProfile,
    getToken,
    registerUser,
    updateProfile,
    updateSettings,
    verifyCredentials,
    verifySession,
    verifyUniqueUser
};
