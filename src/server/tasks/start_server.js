// Modules
const Gulp = require('gulp'),
    Path = require('path'),
    gulpNodemon = require('gulp-nodemon');

Gulp.task('start-server', () => {
    gulpNodemon({
        env: {
            NODE_ENV: 'development'
        },
        ext: 'js',
        script: Path.resolve(`${__dirname}/../../../dist/server/server.js`),
        tasks: [
            'build-server'
        ],
        watch: [
            Path.resolve(`${__dirname}/../**/*`)
        ]
    });
});
