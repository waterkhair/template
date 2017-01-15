// Modules
const Config = require('../config/main');
const Gulp = require('gulp');
const WebpackServerConfig = require('../config/webpack_server');
const webpack = require('webpack');

Gulp.task(Config.GULP.BUILD_SERVER_TASK_NAME, (callback) => {
    webpack(WebpackServerConfig, (err, stats) => {
        if (err) {
            throw err;
        } else {
            console.info(`Stats: ${stats.toString({
                chunks: false,
                colors: true
            })}`);
        }
        callback();
    });
});
