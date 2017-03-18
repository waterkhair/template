// Modules
const Config = require('./config/main'),
    gulp = require('gulp'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

requireDir(Config.GULP.TASKS_PATH, {
    recursive: true
});

// Task to start the API server
gulp.task('start', () => {
    runSequence(
        Config.GULP.START_SERVER_TASK_NAME
    );
});

// Task to test the API server
gulp.task('test', () => {
    runSequence(
        Config.GULP.TEST_SERVER_TASK_NAME
    );
});
