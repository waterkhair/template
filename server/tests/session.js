// Modules
const HTTP_STATUS_CODES = require('../const/http_status_codes'),
    Lab = require('lab'),
    ROUTES = require('../config/routes'),
    {createRequestHeaders} = require('../helpers/headers'),
    {expect} = require('chai'),
    hapiServer = require('../server');
const LabScript = exports.lab = Lab.script(); // eslint-disable-line

LabScript.experiment('Session', () => {
    const bits = 32;
    const username = Date.now().toString(bits);
    const name = `Test ${username}`;
    const email = `test@abc${username}.com`;
    const password = 'test';
    let token = '';

    const setToken = (tokenValue) => {
        token = tokenValue;
    };

    LabScript.test('Register user', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                email,
                name,
                password,
                username
            },
            url: ROUTES.SESSION.SIGN_UP
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
            expect(payload).to.have.property('token');

            done();
        });
    });

    LabScript.test('Login user', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                password: 'test',
                username
            },
            url: ROUTES.SESSION.SIGN_IN
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('token');

            setToken(payload.token);

            done();
        });
    });

    LabScript.test('Get user settings', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'GET',
            url: ROUTES.SESSION.GET_SETTINGS
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('settings');
            expect(payload.settings).to.have.property('theme');
            expect(payload.settings.theme).to.be.a('string');

            done();
        });
    });

    LabScript.test('Delete user', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'DELETE',
            payload: {
                username
            },
            url: ROUTES.SESSION.CLOSE_ACCOUNT
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('token');
            expect(payload.token).to.equal(null);

            done();
        });
    });
});
