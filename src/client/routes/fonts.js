// Modules
import Path from 'path';

// Scripts configuration
const fontsFilesPath = '../../build/Release/client/content/fonts';
const fontsRoutePath = '/fonts/{path*}';

const FontsRoute = {
    handler: {
        directory: {
            path: Path.resolve(fontsFilesPath)
        }
    },
    method: 'GET',
    path: fontsRoutePath
};

export default FontsRoute;
