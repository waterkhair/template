// Modules
const Gulp = require('gulp');
const Path = require('path');
const gulpNodemon = require('gulp-nodemon');

// Start Client configuration
const startServerTaskName = 'start-server';
const ext = 'js';
const script = Path.resolve(`${__dirname}/../../../build/Release/server/server.js`);
const tasks = [
    'build-server'
];
const watch = [
    Path.resolve(`${__dirname}/../**/*`)
];

// Start Server task
Gulp.task(startServerTaskName, () => {
    gulpNodemon({
        env: {
            NODE_ENV: 'development'
        },
        ext,
        script,
        tasks,
        watch
    });
});
