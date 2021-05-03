module.exports = function () {
    $.gulp.task('pug', function () {
        return $.gulp.src('src/pug/pages/*.pug')
            .pipe($.plugins.pug({
                pretty: true
            }))
            .pipe($.gulp.dest('build'));  
    });
}