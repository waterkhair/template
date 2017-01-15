// Modules
import Path from 'path';

// Scripts configuration
const cssFilesPath = '../../build/Release/client/content/css';
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

export default CssRoute;
