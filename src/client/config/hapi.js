// HapiJS configuration
const apiKey = 12345,
    host = 'localhost',
    httpLogUrl = 'http://localhost:3000',
    interval = 1000,
    logsFolderName = 'logs',
    opsLogsPathName = `../../dist/client/${logsFolderName}/ops.log`,
    port = 8080;

export default {
    CONNECTION: {
        host,
        port
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
                    opsLogsPathName
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
    LOGS_FOLDER_NAME: logsFolderName
};
