/* eslint-disable max-lines,  max-statements */
// Modules
const HTTP_STATUS_CODES = require('../const/http_status_codes'),
    Lab = require('lab'),
    ROUTES = require('../config/routes'),
    {createRequestHeaders} = require('../helpers/headers'),
    decode = require('jsonwebtoken/decode'),
    {expect} = require('chai'),
    hapiServer = require('../server');
exports.lab = Lab.script();
const LabScript = exports.lab;

LabScript.experiment('Users -', () => {
    const adminPassword = 'test';
    const adminUsername = 'test';
    const bits = 32;
    const username1 = `${Date.now().toString(bits)}1`;
    const username2 = `${Date.now().toString(bits)}2`;
    const username3 = `${Date.now().toString(bits)}3`;
    const name1 = `Test ${username1}`;
    const name2 = `Test ${username2}`;
    const name3 = `Test ${username2}`;
    const email1 = `test@abc${username1}.com`;
    const email2 = `test@abc${username2}.com`;
    const email3 = `test@abc${username3}.com`;
    const password1 = 'test1';
    const password2 = 'test2';
    const password3 = 'test3';
    let token = '';
    let token1 = '';
    let token2 = '';
    let token3 = '';

    const setToken = (tokenValue, tokenNumber) => {
        switch (tokenNumber) {
        case '1':
            token1 = tokenValue;
            break;
        case '2':
            token2 = tokenValue;
            break;
        case '3':
            token3 = tokenValue;
            break;
        default:
            token = tokenValue;
        }
    };

    LabScript.test('Get Token', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                password: adminPassword,
                username: adminUsername
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

    LabScript.test('Create 1st User', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                email: email1,
                name: name1,
                password: password1,
                username: username1
            },
            url: ROUTES.USERS.CREATE_USER
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
            expect(payload).to.have.property('token');
            expect(payload.token).to.not.be.equal(null);
            expect(payload.token).to.be.an('string');

            setToken(payload.token, '1');
            const user = decode(payload.token);

            expect(user).to.have.property('email');
            expect(user.email).to.not.be.equal(null);
            expect(user.email).to.be.a('string');
            expect(user.email).to.be.equal(email1);
            expect(user).to.have.property('name');
            expect(user.name).to.not.be.equal(null);
            expect(user.name).to.be.a('string');
            expect(user.name).to.be.equal(name1);
            expect(user).to.not.have.property('password');

            done();
        });
    });

    LabScript.test('Create 2nd User', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                email: email2,
                name: name2,
                password: password2,
                username: username2
            },
            url: ROUTES.USERS.CREATE_USER
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
            expect(payload).to.have.property('token');
            expect(payload.token).to.not.be.equal(null);
            expect(payload.token).to.be.an('string');

            setToken(payload.token, '2');
            const user = decode(payload.token);

            expect(user).to.have.property('email');
            expect(user.email).to.not.be.equal(null);
            expect(user.email).to.be.a('string');
            expect(user.email).to.be.equal(email2);
            expect(user).to.have.property('name');
            expect(user.name).to.not.be.equal(null);
            expect(user.name).to.be.a('string');
            expect(user.name).to.be.equal(name2);
            expect(user).to.not.have.property('password');

            done();
        });
    });

    LabScript.test('Create 3rd User', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                email: email3,
                name: name3,
                password: password3,
                username: username3
            },
            url: ROUTES.USERS.CREATE_USER
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
            expect(payload).to.have.property('token');
            expect(payload.token).to.not.be.equal(null);
            expect(payload.token).to.be.an('string');

            setToken(payload.token, '3');
            const user = decode(payload.token);

            expect(user).to.have.property('email');
            expect(user.email).to.not.be.equal(null);
            expect(user.email).to.be.a('string');
            expect(user.email).to.be.equal(email3);
            expect(user).to.have.property('name');
            expect(user.name).to.not.be.equal(null);
            expect(user.name).to.be.a('string');
            expect(user.name).to.be.equal(name3);
            expect(user).to.not.have.property('password');

            done();
        });
    });

    LabScript.test('Update 1st User', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token1),
            method: 'PUT',
            payload: {
                email: `testtest@abc${username1}.com`,
                name: `Testtest ${username1}`,
                password: 'testtest',
                username: username1
            },
            url: ROUTES.USERS.UPDATE_USER
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
            expect(user.email).to.be.equal(`testtest@abc${username1}.com`);
            expect(user).to.have.property('name');
            expect(user.name).to.not.be.equal(null);
            expect(user.name).to.be.a('string');
            expect(user.name).to.be.equal(`Testtest ${username1}`);
            expect(user).to.not.have.property('password');

            done();
        });
    });

    LabScript.test('Set Admin Role To 2nd User', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'PUT',
            payload: {
                admin: true,
                username: username2
            },
            url: ROUTES.USERS.SET_USER_ROLE
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('user');
            expect(payload.user).to.not.be.equal(null);
            expect(payload.user).to.have.property('admin');
            expect(payload.user.admin).to.be.equal(true);

            done();
        });
    });

    LabScript.test('Get Users', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token),
            method: 'GET',
            url: ROUTES.USERS.GET_USERS
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('users');
            expect(payload.users).to.not.be.equal(null);
            expect(payload.users).to.be.an('array');
            expect(payload.users.length.toString()).to.be.greaterThan('3');

            payload.users.forEach((user) => {
                expect(user).to.have.property('username');
                expect(user.username).to.not.equal(null);
                expect(user.username).to.be.a('string');

                if (user.username === username1 || user.username === username2 || user.username === username3) {
                    expect(user).to.have.property('admin');
                    expect(user.admin).to.not.equal(null);
                    expect(user.admin).to.be.a('boolean');

                    if (user.username === username1) {
                        expect(user.admin).to.equal(false);
                        expect(user).to.have.property('email');
                        expect(user.email).to.not.be.equal(null);
                        expect(user.email).to.be.a('string');
                        expect(user.email).to.be.equal(`testtest@abc${username1}.com`);
                        expect(user).to.have.property('name');
                        expect(user.name).to.not.be.equal(null);
                        expect(user.name).to.be.a('string');
                        expect(user.name).to.be.equal(`Testtest ${username1}`);
                    } else if (user.username === username2) {
                        expect(user.admin).to.equal(true);
                    } else {
                        expect(user.admin).to.equal(false);
                    }

                    expect(user).to.not.have.property('password');
                }
            });

            done();
        });
    });

    LabScript.test('Close 1st User Account', (done) => {
        const url = ROUTES.USERS.DELETE_USER.replace('{username}', username1);

        hapiServer.inject({
            headers: createRequestHeaders(token1),
            method: 'DELETE',
            url
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('token');
            expect(payload.token).to.equal(null);

            done();
        });
    });

    LabScript.test('Close 2nd User Account', (done) => {
        const url = ROUTES.USERS.DELETE_USER.replace('{username}', username2);

        hapiServer.inject({
            headers: createRequestHeaders(token2),
            method: 'DELETE',
            url
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('token');
            expect(payload.token).to.equal(null);

            done();
        });
    });

    LabScript.test('Close 3rd User Account', (done) => {
        const url = ROUTES.USERS.DELETE_USER.replace('{username}', username3);

        hapiServer.inject({
            headers: createRequestHeaders(token3),
            method: 'DELETE',
            url
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_200_OK);
            expect(payload).to.have.property('token');
            expect(payload.token).to.equal(null);

            done();
        });
    });
});
