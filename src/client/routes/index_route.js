// Modules
import Config from '../config/main';
import index from '../content/index';

export default {
    handler: (req, reply) => {
        reply(index({
            app: Config.App
        }));
    },
    method: 'GET',
    path: '/{path*}'
};
