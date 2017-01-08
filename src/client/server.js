// Modules
import Hapi from 'hapi';
import Good from 'good';
import Inert from 'inert';
import FS from 'fs';

import Config from './config/main';
import HapiHelper from './helpers/hapi_helper';
import index from './content/index';
//import notFound from './content/not_found';

// Folders
if (!FS.existsSync('../../dist/client/logs')) {
    FS.mkdirSync('../../dist/client/logs');
}

// Hapi
let server = new Hapi.Server();
let hapiHelper = new HapiHelper(server);
server.connection(Config.Hapi.connection);
server.register({
        register: Good,
        options: Config.Hapi.goodOptions
    });
server.register({
        register: Inert
    },
    hapiHelper.registerServerHanlder);

// Routers
server.route({
        method: 'GET',
        path: '/css/{path*}',
        handler: {
            directory: {
                path: '../../dist/client/content/css'
            }
        }
    });
server.route({
        method: 'GET',
        path: '/font/{file*}',
        handler: {
            directory: {
                path: '../../dist/client/content/font'
            }
        }
    });
server.route({
        method: 'GET',
        path: '/js/{file*}',
        handler: {
            directory: {
                path: '../../dist/client/content/js'
            }
        }
    });
server.route({
        method: 'GET',
        path: '/',
        handler: (req, reply) => {
            reply(index({
                app: Config.App
            }));
        }
    });

export default server;
