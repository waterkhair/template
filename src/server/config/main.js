// Modules
const GULP = require('./gulp');
const HAPI = require('./hapi');
const MONGO_DB = require('./mongo_db');
const ROUTES = require('./routes');
const SESSION = require('./session');

// Main configuration
module.exports = {
    GULP,
    HAPI,
    MONGO_DB,
    ROUTES,
    SESSION
};
