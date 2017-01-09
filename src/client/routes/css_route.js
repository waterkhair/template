// Modules
import Path from 'path';

export default {
    handler: {
        directory: {
            path: Path.resolve('../../dist/client/content/css')
        }
    },
    method: 'GET',
    path: '/css/{path*}'
};
