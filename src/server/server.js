// Modules
import {existsSync, mkdirSync} from 'fs';
import Config from './config/main';
import GoodPlugin from './plugins/good';
import Hapi from 'hapi';
import HapiAuthJwt from 'hapi-auth-jwt';
import Mongoose from 'mongoose';
import Routes from './routes/index';

// Folders
if (!existsSync(Config.HAPI.LOGS_FOLDER_PATH)) {
    mkdirSync(Config.HAPI.LOGS_FOLDER_PATH);
}

// Hapi
const hapiServer = new Hapi.Server();
hapiServer.connection(Config.HAPI.CONNECTION);

// PlugIns
hapiServer.register([GoodPlugin, HapiAuthJwt], (err) => {
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
    hapiServer.route(Routes);
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
