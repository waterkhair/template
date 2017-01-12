// Modules
import Path from 'path';

const ScriptsRoute = {
    handler: {
        directory: {
            path: Path.resolve('../../dist/client/content/scripts')
        }
    },
    method: 'GET',
    path: '/scripts/{path*}'
};

export default ScriptsRoute;
