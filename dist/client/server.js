/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	var _main = __webpack_require__(2);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _http = __webpack_require__(3);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _express = __webpack_require__(4);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _winston = __webpack_require__(5);
	
	var _winston2 = _interopRequireDefault(_winston);
	
	var _morgan = __webpack_require__(6);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _index = __webpack_require__(7);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _not_found = __webpack_require__(8);
	
	var _not_found2 = _interopRequireDefault(_not_found);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Express
	var app = (0, _express2.default)(); // Modules
	
	app.disable('x-powered-by');
	app.use((0, _morgan2.default)(process.env.NODE_ENV === 'production' ? '' : 'dev'));
	
	// Routers
	app.get('/*', function (request, response, next) {
	    if (request.originalUrl.indexOf('/css/') === -1 && request.originalUrl.indexOf('/images/') === -1 && request.originalUrl.indexOf('/js/') === -1) {
	        response.send((0, _index2.default)({ app: _main2.default.app }));
	    } else {
	        next();
	    }
	});
	app.use(_express2.default.static('content'));
	app.use(function (request, response) {
	    response.send((0, _not_found2.default)({ app: _main2.default.app }));
	});
	
	// Server
	var server = _http2.default.createServer(app);
	server.listen(8080, function (error) {
	    if (error) {
	        _winston2.default.error('Error: ' + error);
	    } else {
	        _winston2.default.info('Running client server on localhost:8080');
	    }
	});
	
	exports.default = server;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    app: {
	        title: 'Template',
	        description: 'Template for new projects using MongoDB, Express, React and NodeJS.'
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (config) {
	    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <title>" + config.app.title + "</title>\n    <meta name=\"description\" content=\"" + config.app.description + "\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1\">\n    <link href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"/css/styles.css\">\n</head>\n<body>\n    <div id=\"app\"></div>\n    <script>\n        window.config = " + JSON.stringify(config) + "\n    </script>\n    <script src=\"/js/vendor.js\"></script>\n    <script src=\"/js/bundle.js\"></script>\n</body>\n</html>";
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (config) {
	    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <title>" + config.app.title + "</title>\n    <meta name=\"description\" content=\"" + config.app.description + "\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1\">\n    <link href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"/css/styles.css\">\n</head>\n<body>\n    <div id=\"app\">\n        Not Found\n    </div>\n</body>\n</html>";
	};

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map