// Modules
import {existsSync, mkdirSync} from 'fs';
import AuthRoutes from './routes/auth';
import Config from './config/main';
import GoodPlugin from './plugins/good';
import Hapi from 'hapi';
import HapiAuthJwt from 'hapi-auth-jwt';
import IndexRoute from './routes/index';
import Mongoose from 'mongoose';

// Folders
if (!existsSync('../../dist/server/logs')) {
    mkdirSync('../../dist/server/logs');
}

// Hapi
const hapiServer = new Hapi.Server();
hapiServer.connection(Config.HAPI.CONNECTION);

// PlugIns
hapiServer.register(GoodPlugin, (err) => {
    if (err) {
        throw err;
    }
});
hapiServer.register(HapiAuthJwt, (err) => {
    if (err) {
        throw err;
    }
    hapiServer.auth.strategy('jwt', 'jwt', {
        key: Config.AUTH.SECRET_KEY,
        verifyOptions: {
            algorithsm: ['HS256']
        }
    });

    // Routers
    hapiServer.route(IndexRoute);
    hapiServer.route(AuthRoutes.SignInRoute);
    hapiServer.route(AuthRoutes.SignUpRoute);
    hapiServer.route(AuthRoutes.GetUsersRoute);
});

// Start Server
hapiServer.start((err) => {
    if (err) {
        throw err;
    }
    hapiServer.log('info', `Started at: ${hapiServer.info.uri}`);
    Mongoose.connect(Config.MONGO_DB.CONNECTION_STRING, {}, (err) => {
        if (err) {
            throw err;
        }
    });
});

export default hapiServer;
