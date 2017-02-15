// Modules
const Path = require('path');

// Scripts configuration
const cssFilesPath = 'dist/css';
const cssRoutePath = '/css/{path*}';

const CssRoute = {
    handler: {
        directory: {
            path: Path.resolve(cssFilesPath)
        }
    },
    method: 'GET',
    path: cssRoutePath
};

module.exports = CssRoute;
