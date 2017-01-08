const WebpackServerConfig = require('../config/webpack_server'),
    Gulp = require('gulp'),
    webpack = require('webpack');

Gulp.task('build-server', function(callback) {
    webpack(WebpackServerConfig, function(err, stats) {
        if (err) {
            console.error('Error: ' + err);
        } else {
            console.info('Stats: ' + stats.toString({
                chunks: false,
                colors: true
            }));
        }
        callback();
    });
});
