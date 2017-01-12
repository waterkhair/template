// Modules
import Path from 'path';

const CssRoute = {
    handler: {
        directory: {
            path: Path.resolve('../../dist/client/content/css')
        }
    },
    method: 'GET',
    path: '/css/{path*}'
};

export default CssRoute;
