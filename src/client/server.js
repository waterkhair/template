// Modules
import {existsSync, mkdirSync} from 'fs';
import Config from './config/main';
import CssRoute from './routes/css';
import FontsRoute from './routes/fonts';
import GoodPlugin from './plugins/good';
import Hapi from 'hapi';
import ImagesRoute from './routes/images';
import IndexRoute from './routes/index';
import InertPlugin from './plugins/inert';
import ScriptsRoute from './routes/scripts';

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
hapiServer.register(InertPlugin, (err) => {
    if (err) {
        throw err;
    }
});

// Routers
hapiServer.route(CssRoute);
hapiServer.route(FontsRoute);
hapiServer.route(ImagesRoute);
hapiServer.route(IndexRoute);
hapiServer.route(ScriptsRoute);

// Start Server
hapiServer.start((err) => {
    if (err) {
        throw err;
    }
    hapiServer.log('info', `Started at: ${hapiServer.info.uri}`);
});

export default hapiServer;
