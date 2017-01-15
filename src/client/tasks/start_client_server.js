// Modules
const Gulp = require('gulp');
const Path = require('path');
const gulpNodemon = require('gulp-nodemon');

// Start Client configuration
const startClientServerTaskName = 'start-client-server';
const ext = 'js jsx css jpg png gif';
const script = Path.resolve(`${__dirname}/../../../build/Release/client/server.js`);
const tasks = [
    'build-server',
    'build-client'
];
const watch = [
    Path.resolve(`${__dirname}/../**/*`)
];


// Start Client task
Gulp.task(startClientServerTaskName, () => {
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
