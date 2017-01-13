// Modules
import BCryptJS from 'bcryptjs';
import Boom from 'boom';
import Config from '../config/main';
import HTTP_STATUS_CODES from '../const/http_status_codes';
import TokenHelper from '../helpers/token';
import User from '../models/user';

const getUsers = (req, reply) => {
    User.find()
        .select('-password -__v')
        .exec((err, users) => {
            if (err) {
                throw Boom.badRequest(err);
            }
            if (!users.length) {
                throw Boom.notFound('No users found!');
            }
            reply({
                users
            });
        });
};

const registerUser = (req, reply) => {
    const user = new User();
    user.admin = false;
    user.email = req.payload.email;
    user.name = req.payload.name;
    user.username = req.payload.username;

    BCryptJS.genSalt(Config.AUTH.SALT_NUMBER, (err, salt) => {
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
                reply({
                    token: TokenHelper.createToken(user)
                }).code(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
            });
        });
    });
};

const returnToken = (req, reply) => {
    reply({
        token: TokenHelper.createToken(req.pre.user
    )})
    .code(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
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
    getUsers,
    registerUser,
    returnToken,
    verifyCredentials,
    verifyUniqueUser
};
