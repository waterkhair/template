// Modules
import {existsSync, mkdirSync} from 'fs';
import Config from './config/main';
import Good from 'good';
import Hapi from 'hapi';
import Inert from 'inert';
import hapiHelper from './helpers/hapi_helper';
import index from './content/index';

// Folders
if (!existsSync('../../dist/client/logs')) {
    mkdirSync('../../dist/client/logs');
}

// Hapi
const hapiServer = new Hapi.Server();
hapiServer.connection(Config.Hapi.connection);

// PlugIns
hapiServer.register({
    options: Config.Hapi.goodOptions,
    register: Good
});
hapiServer.register({
    register: Inert
},
hapiHelper.registerServer(hapiServer));

// Routers
hapiServer.route({
    handler: {
        directory: {
            path: '../../dist/client/content/css'
        }
    },
    method: 'GET',
    path: '/css/{path*}'
});
hapiServer.route({
    handler: {
        directory: {
            path: '../../dist/client/content/font'
        }
    },
    method: 'GET',
    path: '/font/{path*}'
});
hapiServer.route({
    handler: {
        directory: {
            path: '../../dist/client/content/js'
        }
    },
    method: 'GET',
    path: '/js/{path*}'
});
hapiServer.route({
    handler: (req, reply) => {
        reply(index({
            app: Config.App
        }));
    },
    method: 'GET',
    path: '/{path*}'
});

export default hapiServer;
