// Modules
import Path from 'path';

export default {
    handler: {
        directory: {
            path: Path.resolve('../../dist/client/content/scripts')
        }
    },
    method: 'GET',
    path: '/scripts/{path*}'
};
