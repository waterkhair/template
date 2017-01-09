// Modules
import Path from 'path';

export default {
    handler: {
        directory: {
            path: Path.resolve('../../dist/client/content/fonts')
        }
    },
    method: 'GET',
    path: '/font/{path*}'
};
