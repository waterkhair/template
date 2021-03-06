// Modules
const Boom = require('boom'),
    HTTP_STATUS_CODES = require('../const/http_status_codes'),
    Settings = require('../models/settings');

/**
 * Retrieves the settings of the current user
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const getSettings = (req, reply) => {
    if (req.auth.credentials.username === req.params.username) {
        Settings.findOne({username: req.auth.credentials.username}, (err, settings) => {
            if (err) {
                reply(Boom.badImplementation(err));
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
    } else {
        reply(Boom.badData('Incorrect settings username'));
    }
};

/**
 * Updates the settings of the current user
 * @param {object} req - HTTP request object
 * @param {function} reply - Function to create an HTTP response
 * @returns {undefined}
 */
const updateSettings = (req, reply) => {
    if (req.auth.credentials.username === req.params.username) {
        Settings.findOneAndUpdate({username: req.params.username}, req.payload, {new: true}, (err, settings) => {
            if (err) {
                throw Boom.badImplementation(err);
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
    } else {
        reply(Boom.badData('Incorrect settings update'));
    }
};

module.exports = {
    getSettings,
    updateSettings
};
