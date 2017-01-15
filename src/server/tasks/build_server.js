// Modules
const Gulp = require('gulp');
const WebpackConfig = require('../config/webpack');
const webpack = require('webpack');

Gulp.task('build-server', (callback) => {
    webpack(WebpackConfig, (err, stats) => {
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
