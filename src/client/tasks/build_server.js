// Modules
const Gulp = require('gulp');
const WebpackServerConfig = require('../config/webpack_server');
const webpack = require('webpack');

Gulp.task('build-server', (callback) => {
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
