// Modules
import Config from '../config/main';
import index from '../content/index';

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

export default IndexRoute;
