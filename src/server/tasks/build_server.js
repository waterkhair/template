// Modules
const Config = require('../config/main');
const Gulp = require('gulp');
const WebpackConfig = require('../config/webpack');
const webpack = require('webpack');

Gulp.task(Config.GULP.BUILD_SERVER_TASK_NAME, (callback) => {
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
