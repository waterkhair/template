// Modules
const Config = require('../config/main'),
    {indexCreator} = require('../helpers/index');

// Index route
const IndexRoute = {
    handler: (req, reply) => {
        reply(indexCreator({
            API: Config.API,
            APP: Config.APP,
            ERRORS: Config.ERRORS,
            NOTIFICATIONS: Config.NOTIFICATIONS
        }));
    },
    method: 'GET',
    path: '/{path*}'
};

module.exports = IndexRoute;
