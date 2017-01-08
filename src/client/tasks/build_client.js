const Gulp = require('gulp'),
    WebpackClientConfig = require('../config/webpack_client'),
    webpack = require('webpack');

Gulp.task('build-client', (callback) => {
    webpack(WebpackClientConfig, (err, stats) => {
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
