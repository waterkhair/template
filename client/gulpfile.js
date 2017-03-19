// Modules
const Config = require('./config/main'),
    Gulp = require('gulp'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

requireDir(Config.GULP.TASKS_PATH, {
    recursive: true
});

// Task to build the UI code
Gulp.task('build', () => {
    runSequence(
        Config.GULP.BUILD_CLIENT_TASK_NAME
    );
});

// Task to start the UI server
Gulp.task('start', () => {
    runSequence(
        Config.GULP.START_CLIENT_SERVER_TASK_NAME
    );
});
