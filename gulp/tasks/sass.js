module.exports = function () {
    $.gulp.task('sass', function () {
        return $.gulp.src('src/static/sass/main.sass')
            .pipe($.plugins.sourcemaps.init())
            .pipe($.plugins.sass({
                outputStyle: 'expanded'
            }))
            .pipe($.plugins.autoprefixer({
                overrideBrowserslist: ['last 10 versions']
            }))
            .on("error", $.plugins.notify.onError({
                title: "stile"
             }))
            // .pipe($.plugins.csso())
            .pipe($.plugins.sourcemaps.write())
            .pipe($.gulp.dest('build/css/'));
    });
}