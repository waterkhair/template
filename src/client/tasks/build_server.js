const Gulp = require('gulp'),
    WebpackServerConfig = require('../config/webpack_server'),
    webpack = require('webpack');

Gulp.task('build-server', function(callback) {
    webpack(WebpackServerConfig, function(err, stats) {
        if (err) {
            console.error(`Error: ${err}`);
        } else {
            console.info(`Stats: ${stats.toString({
                chunks: false,
                colors: true
            })}`);
        }
        callback();
    });
});
