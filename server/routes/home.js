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
            'api'
        ]
    },
    method: 'GET',
    path: '/'
};

module.exports = {
    HomeRoute
};
