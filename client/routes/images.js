// Modules
const Path = require('path');

// Images configuration
const imagesFilesPath = 'dist/images';
const imagesRoutePath = '/images/{path*}';

// Images route
const ImagesRoute = {
    handler: {
        directory: {
            path: Path.resolve(imagesFilesPath)
        }
    },
    method: 'GET',
    path: imagesRoutePath
};

module.exports = ImagesRoute;
