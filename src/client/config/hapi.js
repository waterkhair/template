// HapiJS configuration
const apiKey = 12345;
const host = 'localhost';
const httpLogUrl = 'http://localhost:3000';
const interval = 1000;
const logsFolderPath = '../../build/Release/client/logs';
const opsLogsPathName = `${logsFolderPath}/ops.log`;
const port = 8080;

module.exports = {
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
    LOGS_FOLDER_PATH: logsFolderPath
};
