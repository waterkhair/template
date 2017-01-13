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

	var _main = __webpack_require__(3);

	var _main2 = _interopRequireDefault(_main);

	var _css = __webpack_require__(7);

	var _css2 = _interopRequireDefault(_css);

	var _fonts = __webpack_require__(9);

	var _fonts2 = _interopRequireDefault(_fonts);

	var _good = __webpack_require__(10);

	var _good2 = _interopRequireDefault(_good);

	var _hapi = __webpack_require__(12);

	var _hapi2 = _interopRequireDefault(_hapi);

	var _images = __webpack_require__(13);

	var _images2 = _interopRequireDefault(_images);

	var _index = __webpack_require__(14);

	var _index2 = _interopRequireDefault(_index);

	var _inert = __webpack_require__(16);

	var _inert2 = _interopRequireDefault(_inert);

	var _scripts = __webpack_require__(18);

	var _scripts2 = _interopRequireDefault(_scripts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Folders
	// Modules
	if (!(0, _fs.existsSync)('../../dist/client/' + _main2.default.HAPI.LOGS_PATH)) {
	    (0, _fs.mkdirSync)('../../dist/client/' + _main2.default.HAPI.LOGS_PATH);
	}

	// Hapi
	var hapiServer = new _hapi2.default.Server();
	hapiServer.connection(_main2.default.HAPI.CONNECTION);

	// PlugIns
	hapiServer.register(_good2.default, function (err) {
	    if (err) {
	        throw err;
	    }
	});
	hapiServer.register(_inert2.default, function (err) {
	    if (err) {
	        throw err;
	    }
	});

	// Routers
	hapiServer.route(_css2.default);
	hapiServer.route(_fonts2.default);
	hapiServer.route(_images2.default);
	hapiServer.route(_index2.default);
	hapiServer.route(_scripts2.default);

	// Start Server
	hapiServer.start(function (err) {
	    if (err) {
	        throw err;
	    }
	    hapiServer.log('info', 'Started at: ' + hapiServer.info.uri);
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

	var _api = __webpack_require__(4);

	var _api2 = _interopRequireDefault(_api);

	var _app = __webpack_require__(5);

	var _app2 = _interopRequireDefault(_app);

	var _hapi = __webpack_require__(6);

	var _hapi2 = _interopRequireDefault(_hapi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    API: _api2.default,
	    APP: _app2.default,
	    HAPI: _hapi2.default
	}; // Main Configuration

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// API Configuration
	exports.default = {
	    HOST: 'http://localhost:3000'
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// App Configuration
	exports.default = {
	    DESCRIPTION: 'Template for new projects using MongoDB, Express, React and NodeJS.',
	    TITLE: 'Template'
	};

/***/ },
/* 6 */
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
	    port = 8080;

	exports.default = {
	    CONNECTION: {
	        host: host,
	        port: port
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _path = __webpack_require__(8);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CssRoute = {
	    handler: {
	        directory: {
	            path: _path2.default.resolve('../../dist/client/content/css')
	        }
	    },
	    method: 'GET',
	    path: '/css/{path*}'
	}; // Modules
	exports.default = CssRoute;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _path = __webpack_require__(8);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FontsRoute = {
	    handler: {
	        directory: {
	            path: _path2.default.resolve('../../dist/client/content/fonts')
	        }
	    },
	    method: 'GET',
	    path: '/font/{path*}'
	}; // Modules
	exports.default = FontsRoute;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _main = __webpack_require__(3);

	var _main2 = _interopRequireDefault(_main);

	var _good = __webpack_require__(11);

	var _good2 = _interopRequireDefault(_good);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Modules
	exports.default = {
	    options: _main2.default.HAPI.GOOD_OPTIONS,
	    register: _good2.default
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("good");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("hapi");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _path = __webpack_require__(8);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ImagesRoute = {
	    handler: {
	        directory: {
	            path: _path2.default.resolve('../../dist/client/content/images')
	        }
	    },
	    method: 'GET',
	    path: '/images/{path*}'
	}; // Modules
	exports.default = ImagesRoute;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _main = __webpack_require__(3);

	var _main2 = _interopRequireDefault(_main);

	var _index = __webpack_require__(15);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Modules
	var IndexRoute = {
	    handler: function handler(req, reply) {
	        reply((0, _index2.default)({
	            API: _main2.default.API,
	            APP: _main2.default.APP
	        }));
	    },
	    method: 'GET',
	    path: '/{path*}'
	};

	exports.default = IndexRoute;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (config) {
	    return "<!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n        <meta charset=\"utf-8\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n        <title>" + config.APP.TITLE + "</title>\n        <meta name=\"description\" content=\"" + config.APP.DESCRIPTION + "\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1\">\n        <link href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500\" rel=\"stylesheet\">\n        <link rel=\"stylesheet\" type=\"text/css\" href=\"/css/styles.css\">\n        <link rel=\"shortcut icon\" href=\"\">\n    </head>\n    <body>\n        <div id=\"app\"></div>\n        <script>\n            window.config = " + JSON.stringify(config) + "\n        </script>\n        <script src=\"/scripts/vendor.js\"></script>\n        <script src=\"/scripts/bundle.js\"></script>\n    </body>\n    </html>";
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _inert = __webpack_require__(17);

	var _inert2 = _interopRequireDefault(_inert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    register: _inert2.default
	}; // Modules

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("inert");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _path = __webpack_require__(8);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ScriptsRoute = {
	    handler: {
	        directory: {
	            path: _path2.default.resolve('../../dist/client/content/scripts')
	        }
	    },
	    method: 'GET',
	    path: '/scripts/{path*}'
	}; // Modules
	exports.default = ScriptsRoute;

/***/ }
/******/ ]);