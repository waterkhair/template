// Modules
import {existsSync, mkdirSync} from 'fs';
import Config from './config/main';
import GoodPlugin from './plugins/good';
import Hapi from 'hapi';
import HapiAuthJwt from 'hapi-auth-jwt';
import IndexRoute from './routes/index';
import Mongoose from 'mongoose';
import SessionRoutes from './routes/session';
import UsersRoutes from './routes/users';

// Folders
if (!existsSync(Config.HAPI.LOGS_FOLDER_PATH)) {
    mkdirSync(Config.HAPI.LOGS_FOLDER_PATH);
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
        key: Config.SESSION.SECRET_KEY,
        verifyOptions: {
            algorithsm: ['HS256']
        }
    });

    // Routers
    hapiServer.route(IndexRoute);
    hapiServer.route(SessionRoutes.SignInRoute);
    hapiServer.route(SessionRoutes.SignUpRoute);
    hapiServer.route(SessionRoutes.UpdateProfileRoute);
    hapiServer.route(SessionRoutes.UpdateSettingsRoute);
    hapiServer.route(UsersRoutes.GetUsersRoute);
    hapiServer.route(UsersRoutes.SetUserRoleRoute);
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
