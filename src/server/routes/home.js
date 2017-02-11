// Modules
import HeaderSchemas from '../schemas/header';

const HomeRoute = {
    config: {
        handler: (req, reply) => {
            reply({
                message: 'Hello from server!'
            });
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        tags: [
            'api',
            'home'
        ],
        validate: {
            headers: HeaderSchemas.unauthorizatedHeaderSchema
        }
    },
    method: 'GET',
    path: '/'
};

export default {
    HomeRoute
};
