// Modules
const Config = require('./config/main'),
    Gulp = require('gulp'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

requireDir(Config.GULP.TASKS_PATH, {
    recursive: true
});

Gulp.task('build', () => {
    runSequence(
        Config.GULP.BUILD_CLIENT_TASK_NAME
    );
});

Gulp.task('start', () => {
    runSequence(
        Config.GULP.START_CLIENT_SERVER_TASK_NAME
    );
});
