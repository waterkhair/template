// Modules
import Path from 'path';

// Scripts configuration
const imagesFilesPath = '../../build/Release/client/content/images';
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

export default ImagesRoute;
