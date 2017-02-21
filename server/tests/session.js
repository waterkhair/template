/* eslint-disable max-statements */
// Modules
const HTTP_STATUS_CODES = require('../const/http_status_codes'),
    Lab = require('lab'),
    ROUTES = require('../config/routes'),
    {createRequestHeaders} = require('../helpers/headers'),
    decode = require('jsonwebtoken/decode'),
    {expect} = require('chai'),
    hapiServer = require('../server');
const LabScript = exports.lab = Lab.script(); // eslint-disable-line

LabScript.experiment('Session -', () => {
    const bits = 32;
    const username = Date.now().toString(bits);
    const name = `Test ${username}`;
    const email = `test@abc${username}.com`;
    const password = 'test';
    let token = '';

    const setToken = (tokenValue) => {
        token = tokenValue;
    };

    LabScript.test('Register', (done) => {
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
            expect(payload.token).to.not.be.equal(null);
            expect(payload.token).to.be.an('string');

            const user = decode(payload.token);

            expect(user).to.have.property('email');
            expect(user.email).to.not.be.equal(null);
            expect(user.email).to.be.a('string');
            expect(user.email).to.be.equal(email);
            expect(user).to.have.property('name');
            expect(user.name).to.not.be.equal(null);
            expect(user.name).to.be.a('string');
            expect(user.name).to.be.equal(name);
            expect(user).to.not.have.property('password');

            done();
        });
    });

    LabScript.test('Login', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                password,
                username
            },
            url: ROUTES.SESSION.SIGN_IN
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('token');
            expect(payload.token).to.not.be.equal(null);
            expect(payload.token).to.be.an('string');

            const user = decode(payload.token);

            expect(user).to.have.property('email');
            expect(user.email).to.not.be.equal(null);
            expect(user.email).to.be.a('string');
            expect(user.email).to.be.equal(email);
            expect(user).to.have.property('name');
            expect(user.name).to.not.be.equal(null);
            expect(user.name).to.be.a('string');
            expect(user.name).to.be.equal(name);
            expect(user).to.not.have.property('password');

            setToken(payload.token);

            done();
        });
    });

    LabScript.test('Update', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'PUT',
            payload: {
                email: `testtest@abc${username}.com`,
                name: `Testtest ${username}`,
                password: 'testtest',
                username
            },
            url: ROUTES.SESSION.UPDATE_PROFILE
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
            expect(payload).to.have.property('token');
            expect(payload.token).to.not.be.equal(null);
            expect(payload.token).to.be.an('string');

            const user = decode(payload.token);

            expect(user).to.have.property('email');
            expect(user.email).to.not.be.equal(null);
            expect(user.email).to.be.a('string');
            expect(user.email).to.be.equal(`testtest@abc${username}.com`);
            expect(user).to.have.property('name');
            expect(user.name).to.not.be.equal(null);
            expect(user.name).to.be.a('string');
            expect(user.name).to.be.equal(`Testtest ${username}`);
            expect(user).to.not.have.property('password');

            done();
        });
    });

    LabScript.test('Get Settings', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'GET',
            url: ROUTES.SESSION.GET_SETTINGS
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('settings');
            expect(payload.settings).to.not.be.equal(null);
            expect(payload.settings).to.be.an('object');
            expect(payload.settings).to.have.property('theme');
            expect(payload.settings.theme).to.not.be.equal(null);
            expect(payload.settings.theme).to.be.a('string');
            expect(payload.settings.theme).to.be.equal('light');

            done();
        });
    });

    LabScript.test('Update Settings', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'PUT',
            payload: {
                theme: 'dark',
                username
            },
            url: ROUTES.SESSION.UPDATE_SETTINGS
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
            expect(payload).to.have.property('settings');
            expect(payload.settings).to.not.be.equal(null);
            expect(payload.settings).to.be.an('object');
            expect(payload.settings).to.have.property('theme');
            expect(payload.settings.theme).to.not.be.equal(null);
            expect(payload.settings.theme).to.be.a('string');
            expect(payload.settings.theme).to.be.equal('dark');

            done();
        });
    });

    LabScript.test('Get Updated Settings', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'GET',
            url: ROUTES.SESSION.GET_SETTINGS
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('settings');
            expect(payload.settings).to.not.be.equal(null);
            expect(payload.settings).to.be.an('object');
            expect(payload.settings).to.have.property('theme');
            expect(payload.settings.theme).to.not.be.equal(null);
            expect(payload.settings.theme).to.be.a('string');
            expect(payload.settings.theme).to.be.equal('dark');

            done();
        });
    });

    LabScript.test('Delete User', (done) => {
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
