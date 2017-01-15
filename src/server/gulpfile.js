// Modules
const Config = require('./config/main');
const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

requireDir(Config.GULP.TASKS_PATH, {
    recursive: true
});

gulp.task('build', () => {
    runSequence(
        Config.GULP.BUILD_SERVER_TASK_NAME
    );
});

gulp.task('start', () => {
    runSequence(
        Config.GULP.START_SERVER_TASK_NAME
    );
});
