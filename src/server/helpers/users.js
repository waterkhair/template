// Modules
import Boom from 'boom';
import User from '../models/user';

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
                users
            });
        });
};

const setUserRole = (req, reply) => {
    User.findOneAndUpdate({username: req.payload.username}, {admin: req.payload.admin}, (err) => {
        if (err) {
            throw Boom.badRequest(err);
        }

        reply({
            user: {
                admin: req.payload.admin,
                username: req.payload.username
            }
        });
    });
};

export default {
    getUsers,
    setUserRole
};
