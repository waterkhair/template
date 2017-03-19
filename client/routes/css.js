// Modules
const Path = require('path');

// CSS configuration
const cssFilesPath = 'dist/css';
const cssRoutePath = '/css/{path*}';

// CSS route
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
