// Modules
const Path = require('path');

// Scripts configuration
const imagesFilesPath = 'dist/images';
const imagesRoutePath = '/images/{path*}';

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
