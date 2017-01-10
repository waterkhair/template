import BCryptJS from 'bcryptjs';
import Boom from 'boom';
import Config from '../config/main';
import HTTP_STATUS_CODES from '../const/http_status_codes';
import JWT from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/user';

const authenticateUserSchema = Joi
        .alternatives()
        .try(
            Joi.object({
                password: Joi
                    .string()
                    .required(),
                username: Joi
                    .string()
                    .alphanum()
                    .min(Config.AUTH.USER.USERNAME_MIN_CHARS)
                    .max(Config.AUTH.USER.USERNAME_MAX_CHARS)
                    .required()
            }),
            Joi.object({
                password: Joi
                    .string()
                    .required(),
                username: Joi
                    .string()
                    .email()
                    .required()
            })
    );

const createToken = (user) => {
    let scopes = null;

    if (user.admin) {
        scopes = 'admin';
    }

    return JWT.sign({
        id: user._id,
        scope: scopes,
        username: user.username
    },
    Config.AUTH.SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '1h'
    });
};

const createUserSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),
    name: Joi
        .string()
        .required(),
    password: Joi
        .string()
        .required(),
    username: Joi
        .string()
        .alphanum()
        .min(Config.AUTH.USER.USERNAME_MIN_CHARS)
        .max(Config.AUTH.USER.USERNAME_MAX_CHARS)
        .required()
});

const hashPassword = (password, callback) => {
    BCryptJS.genSalt(Config.AUTH.SALT_NUMBER, (err, salt) => {
        if (err) {
            throw err;
        }
        BCryptJS.hash(password, salt, (err, hash) => {
            callback(err, hash);
        });
    });
};

const verifyCredentials = (req, res) => {
    User.findOne({
        $or: [{
            email: req.payload.email
        }, {
            username: req.payload.username
        }]
    },
    (err, user) => {
        if (err) {
            res(Boom.badRequest(err));
        }
        if (user) {
            BCryptJS.compare(req.payload.password, user.password, (err, isValid) => {
                if (err) {
                    res(Boom.badRequest(err));
                }
                if (isValid) {
                    res(user);
                } else {
                    res(Boom.badRequest('Incorrect password!'));
                }
            });
        } else {
            res(Boom.badRequest('Incorrect username or email!'));
        }
    });
};

const verifyUniqueUser = (req, res) => {
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
                res(Boom.badRequest('Username taken'));
            }
            if (user.email === req.payload.email) {
                res(Boom.badRequest('Email taken'));
            }
        }
        res(req.payload);
    });
};

export default {
    signIn: {
        config: {
            handler: (req, reply) => {
                reply({
                    token: createToken(req.pre.user),
                    user: {
                        admin: req.pre.user.admin,
                        email: req.pre.user.email,
                        name: req.pre.user.name,
                        username: req.pre.user.username
                    }
                }).code(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
            },
            pre: [{
                assign: 'user',
                method: verifyCredentials
            }],
            validate: {
                payload: authenticateUserSchema
            }
        },
        method: 'POST',
        path: '/auth/sign-in'
    },
    signUp: {
        config: {
            handler: (req, reply) => {
                const user = new User();
                user.admin = false;
                user.email = req.payload.email;
                user.name = req.payload.name;
                user.username = req.payload.username;
                hashPassword(req.payload.password, (err, hash) => {
                    if (err) {
                        throw Boom.badRequest(err);
                    }
                    user.password = hash;
                    user.save((err, user) => {
                        if (err) {
                            throw Boom.badRequest(err);
                        }
                        reply({
                            token: createToken(user),
                            user: {
                                admin: user.admin,
                                email: user.email,
                                name: user.name,
                                username: user.username
                            }
                        }).code(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
                    });
                });
            },
            pre: [{
                method: verifyUniqueUser
            }],
            validate: {
                payload: createUserSchema
            }
        },
        method: 'POST',
        path: '/auth/sign-up'
    },
    users: {
        config: {
            auth: {
                scope: [
                    'admin'
                ],
                strategy: 'jwt'
            },
            handler: (req, reply) => {
                User.find()
                    .select('-password -__v')
                    .exec((err, users) => {
                        if (err) {
                            throw Boom.badRequest(err);
                        }
                        if (!users.length) {
                            throw Boom.notFound('No users found!');
                        }
                        reply(users);
                    });
            }
        },
        method: 'GET',
        path: '/auth/users'
    }
};
