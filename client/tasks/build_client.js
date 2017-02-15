// Modules
const Config = require('../config/main'),
    Gulp = require('gulp'),
    WebpackClientConfig = require('../config/webpack_client'),
    webpack = require('webpack');

Gulp.task(Config.GULP.BUILD_CLIENT_TASK_NAME, (callback) => {
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
