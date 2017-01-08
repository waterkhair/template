// HapiHelper class
export default class HapiHelper {
    constructor(server) {
        this.server = server;
        this.registerServerHanlder = this.onRegisterServerHandler.bind(this);
    }

    onRegisterServerHandler(err) {
        if (err) {
            throw err;
        }
        this.server.start((err) => {
            if (err) {
                throw err;
            }
            this.server.log('info', 'Started at: ' + this.server.info.uri);
        });
    }
}
