// Modules
import Path from 'path';

// Scripts configuration
const scriptsFilesPath = '../../build/Release/client/content/scripts';
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

export default ScriptsRoute;
