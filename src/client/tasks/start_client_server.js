// Modules
const Config = require('../config/main');
const Gulp = require('gulp');
const Path = require('path');
const gulpNodemon = require('gulp-nodemon');

// Fix watch patterns
const watchPatterns = [];
Config.GULP.WATCH_PATTERNS.forEach((watchPattern) => {
    watchPatterns.push(Path.resolve(`${__dirname}/../${watchPattern}`));
});

// Start Client task
Gulp.task(Config.GULP.START_CLIENT_SERVER_TASK_NAME, () => {
    gulpNodemon({
        env: {
            NODE_ENV: 'development'
        },
        ext: Config.GULP.WATCH_EXTENSIONS,
        script: Path.resolve(Path.join(__dirname, `../../../${Config.GULP.START_SCRIPT_PATH}`)),
        tasks: Config.GULP.TASKS,
        watch: watchPatterns
    });
});
