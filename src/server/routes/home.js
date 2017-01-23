const HomeRoute = {
    handler: (req, reply) => {
        reply('Hello from server!');
    },
    method: 'GET',
    path: '/'
};

export default {
    HomeRoute
};
