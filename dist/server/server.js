/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fs = __webpack_require__(2);

	var _auth_route = __webpack_require__(3);

	var _auth_route2 = _interopRequireDefault(_auth_route);

	var _main = __webpack_require__(6);

	var _main2 = _interopRequireDefault(_main);

	var _good_plugin = __webpack_require__(15);

	var _good_plugin2 = _interopRequireDefault(_good_plugin);

	var _hapi = __webpack_require__(17);

	var _hapi2 = _interopRequireDefault(_hapi);

	var _hapiAuthJwt = __webpack_require__(18);

	var _hapiAuthJwt2 = _interopRequireDefault(_hapiAuthJwt);

	var _index_route = __webpack_require__(19);

	var _index_route2 = _interopRequireDefault(_index_route);

	var _mongoose = __webpack_require__(14);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Folders
	// Modules
	if (!(0, _fs.existsSync)('../../dist/server/logs')) {
	    (0, _fs.mkdirSync)('../../dist/server/logs');
	}

	// Hapi
	var hapiServer = new _hapi2.default.Server();
	hapiServer.connection(_main2.default.HAPI.CONNECTION);

	// PlugIns
	hapiServer.register(_good_plugin2.default, function (err) {
	    if (err) {
	        throw err;
	    }
	});
	hapiServer.register(_hapiAuthJwt2.default, function (err) {
	    if (err) {
	        throw err;
	    }
	    hapiServer.auth.strategy('jwt', 'jwt', {
	        key: 'secretkey',
	        verifyOptions: {
	            algorithsm: ['HS256']
	        }
	    });

	    // Routers
	    hapiServer.route(_index_route2.default);
	    hapiServer.route(_auth_route2.default.signIn);
	    hapiServer.route(_auth_route2.default.signUp);
	    hapiServer.route(_auth_route2.default.users);
	});

	// Start Server
	hapiServer.start(function (err) {
	    if (err) {
	        throw err;
	    }
	    hapiServer.log('info', 'Started at: ' + hapiServer.info.uri);
	    _mongoose2.default.connect(_main2.default.MONGO_DB.CONNECTION_STRING, {}, function (err) {
	        if (err) {
	            throw err;
	        }
	    });
	});

	exports.default = hapiServer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _bcryptjs = __webpack_require__(4);

	var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

	var _boom = __webpack_require__(5);

	var _boom2 = _interopRequireDefault(_boom);

	var _main = __webpack_require__(6);

	var _main2 = _interopRequireDefault(_main);

	var _http_status_codes = __webpack_require__(10);

	var _http_status_codes2 = _interopRequireDefault(_http_status_codes);

	var _jsonwebtoken = __webpack_require__(11);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _joi = __webpack_require__(12);

	var _joi2 = _interopRequireDefault(_joi);

	var _user = __webpack_require__(13);

	var _user2 = _interopRequireDefault(_user);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var authenticateUserSchema = _joi2.default.alternatives().try(_joi2.default.object({
	    password: _joi2.default.string().required(),
	    username: _joi2.default.string().alphanum().min(_main2.default.AUTH.USER.USERNAME_MIN_CHARS).max(_main2.default.AUTH.USER.USERNAME_MAX_CHARS).required()
	}), _joi2.default.object({
	    password: _joi2.default.string().required(),
	    username: _joi2.default.string().email().required()
	}));

	var createToken = function createToken(user) {
	    var scopes = null;

	    if (user.admin) {
	        scopes = 'admin';
	    }

	    return _jsonwebtoken2.default.sign({
	        id: user._id,
	        scope: scopes,
	        username: user.username
	    }, _main2.default.AUTH.SECRET_KEY, {
	        algorithm: 'HS256',
	        expiresIn: '1h'
	    });
	};

	var createUserSchema = _joi2.default.object({
	    email: _joi2.default.string().email().required(),
	    name: _joi2.default.string().required(),
	    password: _joi2.default.string().required(),
	    username: _joi2.default.string().alphanum().min(_main2.default.AUTH.USER.USERNAME_MIN_CHARS).max(_main2.default.AUTH.USER.USERNAME_MAX_CHARS).required()
	});

	var hashPassword = function hashPassword(password, callback) {
	    _bcryptjs2.default.genSalt(_main2.default.AUTH.SALT_NUMBER, function (err, salt) {
	        if (err) {
	            throw err;
	        }
	        _bcryptjs2.default.hash(password, salt, function (err, hash) {
	            callback(err, hash);
	        });
	    });
	};

	var verifyCredentials = function verifyCredentials(req, res) {
	    _user2.default.findOne({
	        $or: [{
	            email: req.payload.email
	        }, {
	            username: req.payload.username
	        }]
	    }, function (err, user) {
	        if (err) {
	            res(_boom2.default.badRequest(err));
	        }
	        if (user) {
	            _bcryptjs2.default.compare(req.payload.password, user.password, function (err, isValid) {
	                if (err) {
	                    res(_boom2.default.badRequest(err));
	                }
	                if (isValid) {
	                    res(user);
	                } else {
	                    res(_boom2.default.badRequest('Incorrect password!'));
	                }
	            });
	        } else {
	            res(_boom2.default.badRequest('Incorrect username or email!'));
	        }
	    });
	};

	var verifyUniqueUser = function verifyUniqueUser(req, res) {
	    _user2.default.findOne({
	        $or: [{
	            email: req.payload.email
	        }, {
	            username: req.payload.username
	        }]
	    }, function (err, user) {
	        if (err) {
	            throw _boom2.default.badRequest(err);
	        }
	        if (user) {
	            if (user.username === req.payload.username) {
	                res(_boom2.default.badRequest('Username taken'));
	            }
	            if (user.email === req.payload.email) {
	                res(_boom2.default.badRequest('Email taken'));
	            }
	        }
	        res(req.payload);
	    });
	};

	exports.default = {
	    signIn: {
	        config: {
	            handler: function handler(req, reply) {
	                reply({
	                    token: createToken(req.pre.user),
	                    user: {
	                        admin: req.pre.user.admin,
	                        email: req.pre.user.email,
	                        name: req.pre.user.name,
	                        username: req.pre.user.username
	                    }
	                }).code(_http_status_codes2.default.SUCCESS_201_CREATED);
	            },
	            pre: [{
	                assign: 'user',
	                method: verifyCredentials
	            }],
	            validate: {
	                payload: authenticateUserSchema
	            }
	        },
	        method: 'POST',
	        path: '/auth/sign-in'
	    },
	    signUp: {
	        config: {
	            handler: function handler(req, reply) {
	                var user = new _user2.default();
	                user.admin = false;
	                user.email = req.payload.email;
	                user.name = req.payload.name;
	                user.username = req.payload.username;
	                hashPassword(req.payload.password, function (err, hash) {
	                    if (err) {
	                        throw _boom2.default.badRequest(err);
	                    }
	                    user.password = hash;
	                    user.save(function (err, user) {
	                        if (err) {
	                            throw _boom2.default.badRequest(err);
	                        }
	                        reply({
	                            token: createToken(user),
	                            user: {
	                                admin: user.admin,
	                                email: user.email,
	                                name: user.name,
	                                username: user.username
	                            }
	                        }).code(_http_status_codes2.default.SUCCESS_201_CREATED);
	                    });
	                });
	            },
	            pre: [{
	                method: verifyUniqueUser
	            }],
	            validate: {
	                payload: createUserSchema
	            }
	        },
	        method: 'POST',
	        path: '/auth/sign-up'
	    },
	    users: {
	        config: {
	            auth: {
	                scope: ['admin'],
	                strategy: 'jwt'
	            },
	            handler: function handler(req, reply) {
	                _user2.default.find().select('-password -__v').exec(function (err, users) {
	                    if (err) {
	                        throw _boom2.default.badRequest(err);
	                    }
	                    if (!users.length) {
	                        throw _boom2.default.notFound('No users found!');
	                    }
	                    reply(users);
	                });
	            }
	        },
	        method: 'GET',
	        path: '/auth/users'
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("bcryptjs");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("boom");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _auth = __webpack_require__(7);

	var _auth2 = _interopRequireDefault(_auth);

	var _hapi = __webpack_require__(8);

	var _hapi2 = _interopRequireDefault(_hapi);

	var _mongo_db = __webpack_require__(9);

	var _mongo_db2 = _interopRequireDefault(_mongo_db);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    AUTH: _auth2.default,
	    HAPI: _hapi2.default,
	    MONGO_DB: _mongo_db2.default
	}; // Main Configuration

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    SALT_NUMBER: 10,
	    SECRET_KEY: 'SECRET_KEY',
	    USER: {
	        USERNAME_MAX_CHARS: 30,
	        USERNAME_MIN_CHARS: 2
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// HapiJS configuration
	var apiKey = 12345,
	    host = 'localhost',
	    httpLogUrl = 'http://localhost:3000',
	    interval = 1000,
	    logsPath = 'logs',
	    port = 3000;

	exports.default = {
	    CONNECTION: {
	        host: host,
	        port: port,
	        routes: {
	            cors: {
	                additionalHeaders: ['cache-control', 'x-requested-with'],
	                headers: ['Content-Type'],
	                origin: ['http://localhost:8080']
	            }
	        }
	    },
	    GOOD_OPTIONS: {
	        ops: {
	            interval: interval
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
	                args: ['../../dist/client/logs/ops.log'],
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
	                args: [httpLogUrl, {
	                    wreck: {
	                        headers: {
	                            'x-api-key': apiKey
	                        }
	                    }
	                }],
	                module: 'good-http'
	            }]
	        }
	    },
	    LOGS_PATH: logsPath
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    CONNECTION_STRING: 'mongodb://localhost:27017/template'
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    CLIENT_ERROR_400_BAD_REQUEST: 400,
	    CLIENT_ERROR_401_UNAUTHORIZED: 401,
	    CLIENT_ERROR_402_PAYMENT_REQUIRED: 402,
	    CLIENT_ERROR_403_FORBIDDEN: 403,
	    CLIENT_ERROR_404_NOT_FOUND: 404,
	    CLIENT_ERROR_405_METHOD_NOT_ALLOWED: 405,
	    CLIENT_ERROR_406_NOT_ACCEPTABLE: 406,
	    CLIENT_ERROR_407_PROXY_AUTHENTICATION_REQUIRED: 407,
	    CLIENT_ERROR_408_REQUEST_TIMEOUT: 408,
	    CLIENT_ERROR_409_CONFLICT: 409,
	    CLIENT_ERROR_410_GONE: 410,
	    CLIENT_ERROR_411_LENGTH_REQUIRED: 411,
	    CLIENT_ERROR_412_PRECONDITION_FAILED: 412,
	    CLIENT_ERROR_413_PAYLOAD_TOO_LARGE: 413,
	    CLIENT_ERROR_414_URI_TOO_LON: 414,
	    CLIENT_ERROR_415_UNSUPPORTED_MEDIA_TYPE: 415,
	    CLIENT_ERROR_416_RANGE_NOT_SATISFIABLE: 416,
	    CLIENT_ERROR_417_EXPECTATION_FAILED: 417,
	    CLIENT_ERROR_418_IM_A_TEAPOT: 418,
	    CLIENT_ERROR_421_MISDIRECTED_REQUEST: 421,
	    CLIENT_ERROR_422_UNPROCESSABLE_ENTITY: 422,
	    CLIENT_ERROR_423_LOCKED: 423,
	    CLIENT_ERROR_424_FAILED_DEPENDENCY: 424,
	    CLIENT_ERROR_426_UPGRADE_REQUIRED: 426,
	    CLIENT_ERROR_428_PRECONDITION_REQUIRED: 428,
	    CLIENT_ERROR_429_TOO_MANY_REQUESTS: 429,
	    CLIENT_ERROR_431_REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	    CLIENT_ERROR_451_UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	    REDIRECTION_300_MULTIPLE_CHOICES: 300,
	    REDIRECTION_301_MOVED_PERMANENTLY: 301,
	    REDIRECTION_302_FOUND: 302,
	    REDIRECTION_303_SEE_OTHER: 303,
	    REDIRECTION_304_NOT_MODIFIED: 304,
	    REDIRECTION_305_USE_PROXY: 305,
	    REDIRECTION_306_SWITCH_PROXY: 306,
	    REDIRECTION_307_TEMPORARY_REDIRECT: 307,
	    REDIRECTION_308_PERMANENT_REDIRECT: 308,
	    SERVER_ERROR_500_INTERNAL_SERVER_ERROR: 500,
	    SERVER_ERROR_501_NOT_IMPLEMENTED: 501,
	    SERVER_ERROR_502_BAD_GATEWAY: 502,
	    SERVER_ERROR_503_SERVICE_UNAVAILABLE: 503,
	    SERVER_ERROR_504_GATEWAY_TIMEOUT: 504,
	    SERVER_ERROR_505_HTTP_VERSION_NOT_SUPPORTED: 505,
	    SERVER_ERROR_506_VARIANT_ALSO_NEGATIATES: 506,
	    SERVER_ERROR_507_INSUFFICIENT_STORAGE: 507,
	    SERVER_ERROR_508_LOOP_DETECTED: 508,
	    SERVER_ERROR_510_NOT_EXTENDED: 510,
	    SERVER_ERROR_511_NETWORK_AUTHENTICATION_REQUIRED: 511,
	    SUCCESS_200_OK: 200,
	    SUCCESS_201_CREATED: 201,
	    SUCCESS_202_ACCEPTED: 202,
	    SUCCESS_203_NON_AUTHORITATIVE_INFORMATION: 203,
	    SUCCESS_204_NO_CONTENT: 204,
	    SUCCESS_205_RESET_CONTENT: 205,
	    SUCCESS_206_PARTIAL_CONTENT: 206,
	    SUCCESS_207_MUTLI_STATUS: 207,
	    SUCCESS_208_ALREADY_REPORTED: 208,
	    SUCCESS_226_IM_USED: 226
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("joi");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mongoose = __webpack_require__(14);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _mongoose2.default.model('User', new _mongoose2.default.Schema({
	    admin: {
	        required: true,
	        type: Boolean
	    },
	    email: {
	        index: {
	            unique: true
	        },
	        required: true,
	        type: String
	    },
	    name: {
	        required: true,
	        type: String
	    },
	    password: {
	        required: true,
	        type: String
	    },
	    username: {
	        index: {
	            unique: true
	        },
	        required: true,
	        type: String
	    }
	})); // Modules

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _main = __webpack_require__(6);

	var _main2 = _interopRequireDefault(_main);

	var _good = __webpack_require__(16);

	var _good2 = _interopRequireDefault(_good);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Modules
	exports.default = {
	    options: _main2.default.HAPI.GOOD_OPTIONS,
	    register: _good2.default
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("good");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("hapi");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("hapi-auth-jwt");

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    handler: function handler(req, reply) {
	        reply('Hello from server side!');
	    },
	    method: 'GET',
	    path: '/'
	};

/***/ }
/******/ ]);