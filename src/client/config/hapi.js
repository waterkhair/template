// HapiJS configuration
const host = 'localhost';
const port = 8080;
const interval = 1000;
const logsPath = 'logs';
const httpLogUrl = 'http://localhost:3000';
const apiKey = 12345;

export default {
    connection: {
        host,
        port
    },
    logsPath,
    goodOptions: {
        ops: {
            interval
        },
        reporters: {
            // Monitor responses and logs
            consoleReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        log: '*',
                        response: '*'
                    }]
                }, {
                    module: 'good-console'
                },
                'stdout'
            ],

            // Monitor ops
            fileReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        ops: '*'
                    }]
                }, {
                    module: 'good-squeeze',
                    name: 'SafeJson'
                }, {
                    module: 'good-file',
                    args: [
                        '../../dist/client/logs/ops.log'
                    ]
                }
            ],
            
            // Monitor HTTP errors
            httpReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        error: '*'
                    }]
                }, {
                    module: 'good-http',
                    args: [
                        httpLogUrl, {
                            wreck: {
                                headers: {
                                    'x-api-key': apiKey
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }
};
