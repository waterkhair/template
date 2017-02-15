// Modules
const Config = require('../config/main'),
    index = require('../helpers/index');

const IndexRoute = {
    handler: (req, reply) => {
        reply(index({
            API: Config.API,
            APP: Config.APP
        }));
    },
    method: 'GET',
    path: '/{path*}'
};

module.exports = IndexRoute;
