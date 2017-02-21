/* eslint-disable max-statements */
// Modules
const HTTP_STATUS_CODES = require('../const/http_status_codes'),
    Lab = require('lab'),
    ROUTES = require('../config/routes'),
    {createRequestHeaders} = require('../helpers/headers'),
    {expect} = require('chai'),
    hapiServer = require('../server');
const LabScript = exports.lab = Lab.script(); // eslint-disable-line

LabScript.experiment('Users', () => {
    const adminPassword = 'test';
    const adminUser = 'test';
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
                username: adminUser
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

    LabScript.test('Register 1th User', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                email: email1,
                name: name1,
                password: password1,
                username: username1
            },
            url: ROUTES.SESSION.SIGN_UP
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
            expect(payload).to.have.property('token');

            setToken(payload.token, '1');

            done();
        });
    });

    LabScript.test('Register 2nd User', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                email: email2,
                name: name2,
                password: password2,
                username: username2
            },
            url: ROUTES.SESSION.SIGN_UP
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
            expect(payload).to.have.property('token');

            setToken(payload.token, '2');

            done();
        });
    });

    LabScript.test('Register 3rd User', (done) => {
        hapiServer.inject({
            method: 'POST',
            payload: {
                email: email3,
                name: name3,
                password: password3,
                username: username3
            },
            url: ROUTES.SESSION.SIGN_UP
        }, (response) => {
            const {payload} = JSON.parse(response.payload);

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_201_CREATED);
            expect(payload).to.have.property('token');

            setToken(payload.token, '3');

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

            expect(response.statusCode).to.equal(HTTP_STATUS_CODES.SUCCESS_202_ACCEPTED);
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

                    if (user.username === username2) {
                        expect(user.admin).to.equal(true);
                    } else {
                        expect(user.admin).to.equal(false);
                    }
                }
            });

            done();
        });
    });

    LabScript.test('Delete 1th User', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token1),
            method: 'DELETE',
            payload: {
                username: username1
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

    LabScript.test('Delete 2nd User', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token2),
            method: 'DELETE',
            payload: {
                username: username2
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

    LabScript.test('Delete 3rd User', (done) => {
        hapiServer.inject({
            headers: createRequestHeaders(token3),
            method: 'DELETE',
            payload: {
                username: username3
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
