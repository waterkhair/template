const gulp = require('gulp'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

requireDir('./tasks', {
    recursive: true
});

gulp.task('build', () => {
    runSequence(
        'build-server'
    );
});
