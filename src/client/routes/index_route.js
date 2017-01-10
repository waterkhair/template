// Modules
import Config from '../config/main';
import index from '../content/index';

export default {
    handler: (req, reply) => {
        reply(index({
            API: Config.API,
            APP: Config.APP
        }));
    },
    method: 'GET',
    path: '/{path*}'
};
