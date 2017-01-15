// Modules
import Boom from 'boom';
import HTTP_STATUS_CODES from '../const/http_status_codes';
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
            user: {
                admin: req.payload.admin,
                username: req.payload.username
            }
        })
        .code(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
    });
};

export default {
    getUsers,
    setUserRole
};
