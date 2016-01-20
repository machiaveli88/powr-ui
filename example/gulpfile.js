var path = require('path');
var gulp = require('gulp');

gulp.task("build", function (callback) {
    require('powr-dev/gulpfile')(
        require('./config.js')(), callback
    );
});