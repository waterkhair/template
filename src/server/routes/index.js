const IndexRoute = {
    handler: (req, reply) => {
        reply('Hello from server side!');
    },
    method: 'GET',
    path: '/'
};

export default IndexRoute;
