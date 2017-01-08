const Path = require('path'),
    Gulp = require('gulp'),
    gulpNodemon = require('gulp-nodemon');

Gulp.task('start-client-server', function() {
    gulpNodemon({
        script: Path.resolve(__dirname + '/../../../dist/client/server.js'),
        ext: 'js jsx css jpg png gif',
        watch: [
            Path.resolve(__dirname + '/../**/*')
        ],
        env: {
            NODE_ENV: 'development'
        },
        tasks: function(changedFiles) {
            console.log('**************************************************CHANGED FILES**************************************************');
            console.log(changedFiles);
            console.log('**************************************************CHANGED FILES**************************************************');
            return [
                'build-server',
                'build-client'
            ];
        }
    });
});
