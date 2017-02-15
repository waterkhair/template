// Modules
const Config = require('../config/main'),
    HapiSwagger = require('hapi-swagger');

module.exports = {
    options: Config.HAPI.HAPI_SWAGGER_OPTIONS,
    register: HapiSwagger
};
