// Modules
const gulp = require('gulp'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

requireDir('./tasks', {
    recursive: true
});

gulp.task('build', () => {
    runSequence(
        'build-client',
        'build-server'
    );
});

gulp.task('start', () => {
    runSequence(
        'start-client-server'
    );
});
