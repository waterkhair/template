// Modules
const Gulp = require('gulp'),
    WebpackServerConfig = require('../config/webpack_server'),
    webpack = require('webpack');

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
