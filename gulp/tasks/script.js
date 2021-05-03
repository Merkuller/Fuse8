module.exports = function () {
    $.gulp.task('scripts', function () {
        return $.gulp.src('src/static/js/*.js')
        .pipe($.plugins.concat('main.js'))
        .pipe($.gulp.dest('build/js/'))
    });
}