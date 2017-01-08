const WebpackClientConfig = require('../config/webpack_client'),
    Gulp = require('gulp'),
    webpack = require('webpack');

Gulp.task('build-client', function(callback) {
    webpack(WebpackClientConfig, function(err, stats) {
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
