/* eslint-disable max-statements */
// Modules
const HTTP_STATUS_CODES = require('../const/http_status_codes'),
    Lab = require('lab'),
    ROUTES = require('../config/routes'),
    decode = require('jsonwebtoken/decode'),
    {expect} = require('chai'),
    hapiServer = require('../server');
exports.lab = Lab.script();
const LabScript = exports.lab;

LabScript.experiment('Session -', () => {
    const username = 'test';
    const name = 'Test User';
    const email = 'test@test.com';
    const password = 'test';

    LabScript.test('Login', (done) => {
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
});
