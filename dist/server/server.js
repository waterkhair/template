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

	var _main = __webpack_require__(10);

	var _main2 = _interopRequireDefault(_main);

	var _good_plugin = __webpack_require__(13);

	var _good_plugin2 = _interopRequireDefault(_good_plugin);

	var _hapi = __webpack_require__(15);

	var _hapi2 = _interopRequireDefault(_hapi);

	var _hapiAuthJwt = __webpack_require__(16);

	var _hapiAuthJwt2 = _interopRequireDefault(_hapiAuthJwt);

	var _index_route = __webpack_require__(17);

	var _index_route2 = _interopRequireDefault(_index_route);

	var _mongoose = __webpack_require__(9);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _register_plugin_handler = __webpack_require__(18);

	var _register_plugin_handler2 = _interopRequireDefault(_register_plugin_handler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Folders
	if (!(0, _fs.existsSync)('../../dist/server/logs')) {
	    (0, _fs.mkdirSync)('../../dist/server/logs');
	}

	// Hapi
	// Modules
	var hapiServer = new _hapi2.default.Server();
	hapiServer.connection(_main2.default.Hapi.connection);

	// PlugIns
	hapiServer.register(_good_plugin2.default, (0, _register_plugin_handler2.default)());
	hapiServer.register(_hapiAuthJwt2.default, (0, _register_plugin_handler2.default)(function () {
	    hapiServer.auth.strategy('jwt', 'jwt', {
	        key: 'secretkey',
	        verifyOptions: {
	            algorithsm: ['HS256']
	        }
	    });

	    // Routers
	    hapiServer.route(_index_route2.default);
	    hapiServer.route(_auth_route2.default.register);
	    hapiServer.route(_auth_route2.default.login);
	}));

	// Start Server
	hapiServer.start((0, _register_plugin_handler2.default)(function () {
	    hapiServer.log('info', 'Started at: ' + hapiServer.info.uri);
	    _mongoose2.default.connect(_main2.default.MongoDB.connection, {}, (0, _register_plugin_handler2.default)());
	}));

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

	var _jsonwebtoken = __webpack_require__(6);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _joi = __webpack_require__(7);

	var _joi2 = _interopRequireDefault(_joi);

	var _user = __webpack_require__(8);

	var _user2 = _interopRequireDefault(_user);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _createdStatusCode = 201,
	    _maxChars = 30,
	    _minChars = 2,
	    _saltNumber = 10,
	    authenticateUserSchema = _joi2.default.alternatives().try(_joi2.default.object({
	    password: _joi2.default.string().required(),
	    username: _joi2.default.string().alphanum().min(_minChars).max(_maxChars).required()
	}), _joi2.default.object({
	    password: _joi2.default.string().required(),
	    username: _joi2.default.string().email().required()
	})),
	    createToken = function createToken(user) {
	    var scopes = null;
	    if (user.admin) {
	        scopes = 'admin';
	    }

	    return _jsonwebtoken2.default.sign({
	        id: user._id,
	        scope: scopes,
	        username: user.username
	    }, 'secretkey', {
	        algorithm: 'HS256',
	        expiresIn: '1h'
	    });
	},
	    createUserSchema = _joi2.default.object({
	    email: _joi2.default.string().email().required(),
	    password: _joi2.default.string().required(),
	    username: _joi2.default.string().alphanum().min(_minChars).max(_maxChars).required()
	}),
	    hashPassword = function hashPassword(password, callback) {
	    _bcryptjs2.default.genSalt(_saltNumber, function (err, salt) {
	        if (err) {
	            throw err;
	        }
	        _bcryptjs2.default.hash(password, salt, function (err, hash) {
	            callback(err, hash);
	        });
	    });
	},
	    verifyCredentials = function verifyCredentials(req, res) {
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
	},
	    verifyUniqueUser = function verifyUniqueUser(req, res) {
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
	    login: {
	        config: {
	            handler: function handler(req, reply) {
	                reply({
	                    idToken: createToken(req.pre.user)
	                }).code(_createdStatusCode);
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
	        path: '/auth/authenticate'
	    },
	    register: {
	        config: {
	            handler: function handler(req, reply) {
	                var user = new _user2.default();
	                user.email = req.payload.email;
	                user.username = req.payload.username;
	                user.admin = false;
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
	                            idToken: createToken(user)
	                        }).code(_createdStatusCode);
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
	        path: '/auth/register'

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
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("joi");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mongoose = __webpack_require__(9);

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
/* 9 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _hapi = __webpack_require__(11);

	var _hapi2 = _interopRequireDefault(_hapi);

	var _mongodb = __webpack_require__(12);

	var _mongodb2 = _interopRequireDefault(_mongodb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Main Configuration
	exports.default = {
	    Hapi: _hapi2.default,
	    MongoDB: _mongodb2.default
	};

/***/ },
/* 11 */
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
	    connection: {
	        host: host,
	        port: port
	    },
	    goodOptions: {
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
	    logsPath: logsPath
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    connection: 'mongodb://localhost:27017/hapi-app'
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _main = __webpack_require__(10);

	var _main2 = _interopRequireDefault(_main);

	var _good = __webpack_require__(14);

	var _good2 = _interopRequireDefault(_good);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Modules
	exports.default = {
	    options: _main2.default.Hapi.goodOptions,
	    register: _good2.default
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("good");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("hapi");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("hapi-auth-jwt");

/***/ },
/* 17 */
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

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var internalCallback = null;
	var registerPluginHandler = function registerPluginHandler(err) {
	    if (err) {
	        throw err;
	    }
	    if (internalCallback) {
	        internalCallback();
	    }
	};

	exports.default = function (callback) {
	    internalCallback = callback;

	    return registerPluginHandler;
	};

/***/ }
/******/ ]);