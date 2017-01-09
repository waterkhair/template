// Modules
import {existsSync, mkdirSync} from 'fs';
import Config from './config/main';
import CssRoute from './routes/css_route';
import FontsRoute from './routes/fonts_route';
import GoodPlugin from './plugins/good_plugin';
import Hapi from 'hapi';
import IndexRoute from './routes/index_route';
import InertPlugin from './plugins/inert_plugin';
import ScriptsRoute from './routes/scripts_route';
import errorHandler from './helpers/error_handler';

// Folders
if (!existsSync('../../dist/client/logs')) {
    mkdirSync('../../dist/client/logs');
}

// Hapi
const hapiServer = new Hapi.Server();
hapiServer.connection(Config.Hapi.connection);

// PlugIns
hapiServer.register(GoodPlugin, errorHandler());
hapiServer.register(InertPlugin, errorHandler());

// Routers
hapiServer.route(CssRoute);
hapiServer.route(FontsRoute);
hapiServer.route(IndexRoute);
hapiServer.route(ScriptsRoute);

// Start Server
hapiServer.start(errorHandler(() => {
    hapiServer.log('info', `Started at: ${hapiServer.info.uri}`);
}));

export default hapiServer;
