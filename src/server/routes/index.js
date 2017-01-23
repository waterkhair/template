const IndexRoute = {
    handler: (req, reply) => {
        reply('Hello from server!');
    },
    method: 'GET',
    path: '/'
};

export default IndexRoute;
