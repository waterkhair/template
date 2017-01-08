const Gulp = require('gulp'),
    WebpackConfig = require('../config/webpack'),
    webpack = require('webpack');

Gulp.task('build-server', function(callback) {
    webpack(WebpackConfig, function(err, stats) {
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
