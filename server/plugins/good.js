// Modules
const Config = require('../config/main'),
    Good = require('good');

module.exports = {
    options: Config.HAPI.GOOD_OPTIONS,
    register: Good
};
