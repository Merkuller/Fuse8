global.$ = {
    gulp: require('gulp'),
    plugins: require('gulp-load-plugins')(),

    path: {
        tasks: require('./gulp/config/tasks.js')
    }
};

$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('default',$.gulp.series($.gulp.parallel('pug','sass','scripts'),
    'watch'
));