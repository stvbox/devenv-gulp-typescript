const gulp = require('gulp');
const ts = require('gulp-typescript');
const browserify = require('gulp-browserify');
const connect = require('gulp-connect');

gulp.task('default', ['watch', 'webserver']);

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', ['transpile', 'bundle', 'reload']);
});

gulp.task('transpile', () => {
    gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            //outFile: 'output.js'
        }))
        .pipe(gulp.dest('dist/tmpjs'));
});

gulp.task('bundle', () => {
    browserify('dist/tmpjs/app.js').bundle()
        .pipe(gulp.dest('dist/js'))
});

gulp.task('reload', function() {
    connect.reload();
});

gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});