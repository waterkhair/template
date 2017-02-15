// Modules
const {existsSync, mkdirSync} = require('fs'),
    Config = require('./config/main'),
    GoodPlugin = require('./plugins/good'),
    Hapi = require('hapi'),
    HapiAuthJwt = require('hapi-auth-jwt'),
    HapiSwagger = require('./plugins/hapi_swagger'),
    Inert = require('inert'),
    Mongoose = require('mongoose'),
    Routes = require('./routes/index'),
    Vision = require('vision');

// Folders
if (!existsSync(Config.HAPI.LOGS_FOLDER_PATH)) {
    mkdirSync(Config.HAPI.LOGS_FOLDER_PATH);
}

// Hapi
const hapiServer = new Hapi.Server();
hapiServer.connection(Config.HAPI.CONNECTION);

// PlugIns
hapiServer.register([GoodPlugin, HapiAuthJwt, HapiSwagger, Inert, Vision], (err) => {
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

    // Start mongoose
    Mongoose.Promise = global.Promise;
    Mongoose.connect(Config.MONGO_DB.CONNECTION_STRING, {}, (err) => {
        if (err) {
            throw err;
        }
    });
});

module.exports = hapiServer;
