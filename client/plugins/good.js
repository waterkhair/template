// Modules
const Config = require('../config/main'),
    Good = require('good');

// PlugIn to log all HTTP requests
module.exports = {
    options: Config.HAPI.GOOD_OPTIONS,
    register: Good
};
