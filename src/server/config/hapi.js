// HapiJS configuration
const apiKey = 12345,
    host = 'localhost',
    httpLogUrl = 'http://localhost:3000',
    interval = 1000,
    logsPath = 'logs',
    port = 3000;

export default {
    CONNECTION: {
        host,
        port,
        routes: {
            cors: {
                additionalHeaders: [
                    'cache-control',
                    'x-requested-with'
                ],
                headers: [
                    'Content-Type'
                ],
                origin: ['http://localhost:8080']
            }
        }
    },
    GOOD_OPTIONS: {
        ops: {
            interval
        },
        reporters: {
            // Monitor responses and logs
            consoleReporter: [{
                args: [{
                    log: '*',
                    response: '*'
                }],
                module: 'good-squeeze',
                name: 'Squeeze'
            }, {
                module: 'good-console'
            }, 'stdout'],

            // Monitor ops
            fileReporter: [{
                args: [{
                    ops: '*'
                }],
                module: 'good-squeeze',
                name: 'Squeeze'
            }, {
                module: 'good-squeeze',
                name: 'SafeJson'
            }, {
                args: [
                    '../../dist/client/logs/ops.log'
                ],
                module: 'good-file'
            }],

            // Monitor HTTP errors
            httpReporter: [{
                args: [{
                    error: '*'
                }],
                module: 'good-squeeze',
                name: 'Squeeze'
            }, {
                args: [
                    httpLogUrl, {
                        wreck: {
                            headers: {
                                'x-api-key': apiKey
                            }
                        }
                    }
                ],
                module: 'good-http'
            }]
        }
    },
    LOGS_PATH: logsPath
};
