// Modules
import {existsSync, mkdirSync} from 'fs';
import AuthRoute from './routes/auth_route';
import Config from './config/main';
import GoodPlugin from './plugins/good_plugin';
import Hapi from 'hapi';
import HapiAuthJwt from 'hapi-auth-jwt';
import IndexRoute from './routes/index_route';
import Mongoose from 'mongoose';
import registerPluginHandler from './helpers/register_plugin_handler';

// Folders
if (!existsSync('../../dist/server/logs')) {
    mkdirSync('../../dist/server/logs');
}

// Hapi
const hapiServer = new Hapi.Server();
hapiServer.connection(Config.Hapi.connection);

// PlugIns
hapiServer.register(GoodPlugin, registerPluginHandler());
hapiServer.register(HapiAuthJwt, registerPluginHandler(() => {
    hapiServer.auth.strategy('jwt', 'jwt', {
        key: 'secretkey',
        verifyOptions: {
            algorithsm: [
                'HS256'
            ]
        }
    });

    // Routers
    hapiServer.route(IndexRoute);
    hapiServer.route(AuthRoute.register);
    hapiServer.route(AuthRoute.login);
}));

// Start Server
hapiServer.start(registerPluginHandler(() => {
    hapiServer.log('info', `Started at: ${hapiServer.info.uri}`);
    Mongoose.connect(Config.MongoDB.connection, {
    }, registerPluginHandler());
}));

export default hapiServer;
