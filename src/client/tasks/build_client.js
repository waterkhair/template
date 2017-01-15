// Modules
const Gulp = require('gulp');
const WebpackClientConfig = require('../config/webpack_client');
const webpack = require('webpack');

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
