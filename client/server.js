// Modules
const {existsSync, mkdirSync} = require('fs'),
    Config = require('./config/main'),
    CssRoute = require('./routes/css'),
    GoodPlugin = require('./plugins/good'),
    Hapi = require('hapi'),
    ImagesRoute = require('./routes/images'),
    IndexRoute = require('./routes/index'),
    InertPlugin = require('./plugins/inert'),
    ScriptsRoute = require('./routes/scripts');

// Folders
if (!existsSync(Config.HAPI.LOGS_FOLDER_PATH)) {
    mkdirSync(Config.HAPI.LOGS_FOLDER_PATH);
}

// Hapi
const hapiServer = new Hapi.Server();
hapiServer.connection(Config.HAPI.CONNECTION);

// PlugIns
hapiServer.register([GoodPlugin, InertPlugin], (err) => {
    if (err) {
        throw err;
    }
});

// Routers
hapiServer.route(CssRoute);
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

module.exports = hapiServer;
