// Modules
const HTTP_STATUS_CODES = require('../const/http_status_codes'),
    Lab = require('lab'),
    ROUTES = require('../config/routes'),
    hapiServer = require('../server');
const LabScript = exports.lab = Lab.script();

LabScript.experiment('Session', () => {
    LabScript.test('Login Test', (done) => {
        const options = {
            method: 'POST',
            payload: {
                password: 'test',
                username: 'test'
            },
            url: ROUTES.SESSION.SIGN_IN
        };

        hapiServer.inject(options, (response) => {
            Lab.expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            console.log(response);
            done();
        });
    });
});
