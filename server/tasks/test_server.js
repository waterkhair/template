// Modules
const Config = require('../config/main'),
    Gulp = require('gulp'),
    gulpLab = require('gulp-lab');

Gulp.task(Config.GULP.TEST_SERVER_TASK_NAME, () =>
    Gulp
        .src('tests/**.js')
        .pipe(gulpLab())
);
