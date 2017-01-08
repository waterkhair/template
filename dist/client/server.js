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

	var _hapi = __webpack_require__(2);

	var _hapi2 = _interopRequireDefault(_hapi);

	var _good = __webpack_require__(3);

	var _good2 = _interopRequireDefault(_good);

	var _inert = __webpack_require__(4);

	var _inert2 = _interopRequireDefault(_inert);

	var _fs = __webpack_require__(5);

	var _fs2 = _interopRequireDefault(_fs);

	var _main = __webpack_require__(6);

	var _main2 = _interopRequireDefault(_main);

	var _hapi_helper = __webpack_require__(9);

	var _hapi_helper2 = _interopRequireDefault(_hapi_helper);

	var _index = __webpack_require__(10);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import notFound from './content/not_found';

	// Folders
	if (!_fs2.default.existsSync('../../dist/client/logs')) {
	    _fs2.default.mkdirSync('../../dist/client/logs');
	}

	// Hapi
	// Modules
	var server = new _hapi2.default.Server();
	var hapiHelper = new _hapi_helper2.default(server);
	server.connection(_main2.default.Hapi.connection);
	server.register({
	    register: _good2.default,
	    options: _main2.default.Hapi.goodOptions
	});
	server.register({
	    register: _inert2.default
	}, hapiHelper.registerServerHanlder);

	// Routers
	server.route({
	    method: 'GET',
	    path: '/css/{path*}',
	    handler: {
	        directory: {
	            path: '../../dist/client/content/css'
	        }
	    }
	});
	server.route({
	    method: 'GET',
	    path: '/font/{file*}',
	    handler: {
	        directory: {
	            path: '../../dist/client/content/font'
	        }
	    }
	});
	server.route({
	    method: 'GET',
	    path: '/js/{file*}',
	    handler: {
	        directory: {
	            path: '../../dist/client/content/js'
	        }
	    }
	});
	server.route({
	    method: 'GET',
	    path: '/',
	    handler: function handler(req, reply) {
	        reply((0, _index2.default)({
	            app: _main2.default.App
	        }));
	    }
	});

	exports.default = server;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("hapi");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("good");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("inert");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _app = __webpack_require__(7);

	var _app2 = _interopRequireDefault(_app);

	var _hapi = __webpack_require__(8);

	var _hapi2 = _interopRequireDefault(_hapi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Main Configuration
	exports.default = {
	    App: _app2.default,
	    Hapi: _hapi2.default
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// App Configuration
	exports.default = {
	    title: 'Template',
	    description: 'Template for new projects using MongoDB, Express, React and NodeJS.'
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// HapiJS configuration
	var host = 'localhost';
	var port = 8080;
	var interval = 1000;
	var logsPath = 'logs';
	var httpLogUrl = 'http://localhost:3000';
	var apiKey = 12345;

	exports.default = {
	    connection: {
	        host: host,
	        port: port
	    },
	    logsPath: logsPath,
	    goodOptions: {
	        ops: {
	            interval: interval
	        },
	        reporters: {
	            // Monitor responses and logs
	            consoleReporter: [{
	                module: 'good-squeeze',
	                name: 'Squeeze',
	                args: [{
	                    log: '*',
	                    response: '*'
	                }]
	            }, {
	                module: 'good-console'
	            }, 'stdout'],

	            // Monitor ops
	            fileReporter: [{
	                module: 'good-squeeze',
	                name: 'Squeeze',
	                args: [{
	                    ops: '*'
	                }]
	            }, {
	                module: 'good-squeeze',
	                name: 'SafeJson'
	            }, {
	                module: 'good-file',
	                args: ['../../dist/client/logs/ops.log']
	            }],

	            // Monitor HTTP errors
	            httpReporter: [{
	                module: 'good-squeeze',
	                name: 'Squeeze',
	                args: [{
	                    error: '*'
	                }]
	            }, {
	                module: 'good-http',
	                args: [httpLogUrl, {
	                    wreck: {
	                        headers: {
	                            'x-api-key': apiKey
	                        }
	                    }
	                }]
	            }]
	        }
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// HapiHelper class
	var HapiHelper = function () {
	    function HapiHelper(server) {
	        _classCallCheck(this, HapiHelper);

	        this.server = server;
	        this.registerServerHanlder = this.onRegisterServerHandler.bind(this);
	    }

	    _createClass(HapiHelper, [{
	        key: 'onRegisterServerHandler',
	        value: function onRegisterServerHandler(err) {
	            var _this = this;

	            if (err) {
	                throw err;
	            }
	            this.server.start(function (err) {
	                if (err) {
	                    throw err;
	                }
	                _this.server.log('info', 'Started at: ' + _this.server.info.uri);
	            });
	        }
	    }]);

	    return HapiHelper;
	}();

	exports.default = HapiHelper;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (config) {
	    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <title>" + config.app.title + "</title>\n    <meta name=\"description\" content=\"" + config.app.description + "\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1\">\n    <link href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"/css/styles.css\">\n    <link rel=\"shortcut icon\" href=\"\">\n</head>\n<body>\n    <div id=\"app\"></div>\n    <script>\n        window.config = " + JSON.stringify(config) + "\n    </script>\n    <script src=\"/js/vendor.js\"></script>\n    <script src=\"/js/bundle.js\"></script>\n</body>\n</html>";
	};

/***/ }
/******/ ]);