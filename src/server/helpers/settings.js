// Modules
import Boom from 'boom';
import HTTP_STATUS_CODES from '../const/http_status_codes';
import Settings from '../models/settings';

const getSettings = (req, reply) => {
    Settings.findOne({username: req.payload.username}, (err, settings) => {
        if (err) {
            reply(Boom.badRequest(err));
        }

        reply({
            settings: {
                theme: settings.theme
            }
        })
        .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
    });
};

const updateSettings = (req, reply) => {
    Settings.findOneAndUpdate({username: req.payload.username}, req.payload, {new: true}, (err, settings) => {
        if (err) {
            throw Boom.badRequest(err);
        }

        reply({
            settings: {
                theme: settings.theme
            }
        })
        .code(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
    });
};

export default {
    getSettings,
    updateSettings
};
