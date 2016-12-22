const webpackConfig = require('../config/webpack_server'),
    gulp = require('gulp'),
    webpack = require('webpack'),
    winston = require('winston');

gulp.task('build-server', function(callback) {
    webpack(webpackConfig, function(error, stats) {
        if (error) {
            winston.error('Error: ' + error);
        } else {
            winston.info('Stats: ' + stats.toString({
                chunks: false,
                colors: true
            }));
        }
        callback();
    });
});
