// Modules
const HTTP_STATUS_CODES = require('../const/http_status_codes'),
    Lab = require('lab'),
    ROUTES = require('../config/routes'),
    {createRequestHeaders} = require('../helpers/headers'),
    {expect} = require('chai'),
    hapiServer = require('../server');
exports.lab = Lab.script();
const LabScript = exports.lab;


LabScript.experiment('Settings -', () => {
    const password = 'test';
    const username = 'test';
    let token = '';

    const setToken = (tokenValue) => {
        token = tokenValue;
    };

    LabScript.test('Get Token', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                password,
                username
            },
            url: ROUTES.SESSION.LOGIN
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('token');

            setToken(payload.token);

            done();
        });
    });

    LabScript.test('Get Settings', (done) => {
        const url = ROUTES.SETTINGS.GET_SETTINGS.replace('{username}', username);

        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'GET',
            url
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('settings');
            expect(payload.settings).to.not.be.equal(null);
            expect(payload.settings).to.be.an('object');
            expect(payload.settings).to.have.property('theme');
            expect(payload.settings.theme).to.not.be.equal(null);
            expect(payload.settings.theme).to.be.a('string');

            done();
        });
    });

    LabScript.test('Update Settings', (done) => {
        const url = ROUTES.SETTINGS.UPDATE_SETTINGS.replace('{username}', username);

        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'PUT',
            payload: {
                theme: 'dark'
            },
            url
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

    LabScript.test('Get Updated Settings', (done) => {
        const url = ROUTES.SETTINGS.GET_SETTINGS.replace('{username}', username);

        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'GET',
            url
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
});
