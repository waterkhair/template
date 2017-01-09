// HapiJS configuration
const apiKey = 12345,
    host = 'localhost',
    httpLogUrl = 'http://localhost:3000',
    interval = 1000,
    logsPath = 'logs',
    port = 8080;

export default {
    connection: {
        host,
        port
    },
    goodOptions: {
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
    logsPath
};