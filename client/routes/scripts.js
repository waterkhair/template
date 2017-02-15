// Modules
const Path = require('path');

// Scripts configuration
const scriptsFilesPath = 'dist/scripts';
const scriptsRoutePath = '/scripts/{path*}';

const ScriptsRoute = {
    handler: {
        directory: {
            path: Path.resolve(scriptsFilesPath)
        }
    },
    method: 'GET',
    path: scriptsRoutePath
};

module.exports = ScriptsRoute;
