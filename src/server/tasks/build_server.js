const Gulp = require('gulp'),
    WebpackConfig = require('../config/webpack'),
    webpack = require('webpack');

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
