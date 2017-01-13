// Modules
import Path from 'path';

const ImagesRoute = {
    handler: {
        directory: {
            path: Path.resolve('../../dist/client/content/images')
        }
    },
    method: 'GET',
    path: '/images/{path*}'
};

export default ImagesRoute;
