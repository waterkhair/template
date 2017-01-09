import BCryptJS from 'bcryptjs';
import Boom from 'boom';
import JWT from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/user';

const _createdStatusCode = 201,
    _maxChars = 30,
    _minChars = 2,
    _saltNumber = 10,
    authenticateUserSchema = Joi
        .alternatives()
        .try(
            Joi.object({
                password: Joi
                    .string()
                    .required(),
                username: Joi
                    .string()
                    .alphanum()
                    .min(_minChars)
                    .max(_maxChars)
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
    ),
    createToken = (user) => {
        let scopes = null;
        if (user.admin) {
            scopes = 'admin';
        }

        return JWT.sign({
            id: user._id,
            scope: scopes,
            username: user.username
        },
        'secretkey', {
            algorithm: 'HS256',
            expiresIn: '1h'
        });
    },
    createUserSchema = Joi.object({
        email: Joi
            .string()
            .email()
            .required(),
        password: Joi
            .string()
            .required(),
        username: Joi
            .string()
            .alphanum()
            .min(_minChars)
            .max(_maxChars)
            .required()
    }),
    hashPassword = (password, callback) => {
        BCryptJS.genSalt(_saltNumber, (err, salt) => {
            if (err) {
                throw err;
            }
            BCryptJS.hash(password, salt, (err, hash) => {
                callback(err, hash);
            });
        });
    },
    verifyCredentials = (req, res) => {
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
    },
    verifyUniqueUser = (req, res) => {
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
    login: {
        config: {
            handler: (req, reply) => {
                reply({
                    idToken: createToken(req.pre.user)
                }).code(_createdStatusCode);
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
        path: '/auth/authenticate'
    },
    register: {
        config: {
            handler: (req, reply) => {
                const user = new User();
                user.email = req.payload.email;
                user.username = req.payload.username;
                user.admin = false;
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
                            idToken: createToken(user)
                        }).code(_createdStatusCode);
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
        path: '/auth/register'

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
