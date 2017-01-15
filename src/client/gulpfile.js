// Modules
const Config = require('./config/main');
const Gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

requireDir(Config.GULP.TASKS_PATH, {
    recursive: true
});

Gulp.task('build', () => {
    runSequence(
        Config.GULP.BUILD_CLIENT_TASK_NAME,
        Config.GULP.BUILD_SERVER_TASK_NAME
    );
});

Gulp.task('start', () => {
    runSequence(
        Config.GULP.START_CLIENT_SERVER_TASK_NAME
    );
});
