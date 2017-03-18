// HapiJS configuration
const apiKey = 12345;
const additionalHeaders = [
    'cache-control',
    'x-requested-with'
];
const hapiSwaggerTitle = 'Template API Documentation';
const headers = [
    'Authorization',
    'Content-Type'
];
const host = 'localhost';
const httpLogUrl = 'http://localhost:3000';
const interval = 1000;
const logsFolderPath = 'logs';
const opsLogsPathName = `${logsFolderPath}/ops.log`;
const origin = [
    'http://localhost:8080'
];
const pack = '../package';
const port = 3000;

module.exports = {
    CONNECTION: {
        host,
        port,
        routes: {
            cors: {
                additionalHeaders,
                headers,
                origin
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
    HAPI_SWAGGER: {
        title: hapiSwaggerTitle,
        version: pack.version
    },
    LOGS_FOLDER_PATH: logsFolderPath
};
