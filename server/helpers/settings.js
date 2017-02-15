// Modules
const Boom = require('boom'),
    HTTP_STATUS_CODES = require('../const/http_status_codes'),
    Settings = require('../models/settings');

const getSettings = (req, reply) => {
    Settings.findOne({username: req.auth.credentials.username}, (err, settings) => {
        if (err) {
            reply(Boom.badRequest(err));
        }

        reply({
            payload: {
                settings: {
                    theme: settings.theme
                }
            }
        })
        .code(HTTP_STATUS_CODES.SUCCESS_200_OK);
    });
};

const updateSettings = (req, reply) => {
    if (req.auth.credentials.username === req.payload.username) {
        Settings.findOneAndUpdate({username: req.payload.username}, req.payload, {new: true}, (err, settings) => {
            if (err) {
                throw Boom.badRequest(err);
            }

            reply({
                payload: {
                    settings: {
                        theme: settings.theme
                    }
                }
            })
            .code(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
        });
    } else {
        reply(Boom.badRequest('Incorrect settings update!'));
    }
};

module.exports = {
    getSettings,
    updateSettings
};
