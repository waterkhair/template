// Modules
import Path from 'path';

const FontsRoute = {
    handler: {
        directory: {
            path: Path.resolve('../../dist/client/content/fonts')
        }
    },
    method: 'GET',
    path: '/font/{path*}'
};

export default FontsRoute;
