// HapiHelper class
const registerServer = (hapiServer) => (err) => {
    if (err) {
        throw err;
    }
    hapiServer.start((err) => {
        if (err) {
            throw err;
        }
        hapiServer.log('info', `Started at: ${hapiServer.info.uri}`);
    });
};

export default {
    registerServer
};
