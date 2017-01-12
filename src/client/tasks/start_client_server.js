// Modules
const Gulp = require('gulp'),
    Path = require('path'),
    gulpNodemon = require('gulp-nodemon');

Gulp.task('start-client-server', () => {
    gulpNodemon({
        env: {
            NODE_ENV: 'development'
        },
        ext: 'js jsx css jpg png gif',
        script: Path.resolve(`${__dirname}/../../../dist/client/server.js`),
        tasks: [
            'build-server',
            'build-client'
        ],
        watch: [
            Path.resolve(`${__dirname}/../**/*`)
        ]
    });
});
