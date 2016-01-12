'use strict';

var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var gulpSequence = require('gulp-sequence');

gulp.task('clean', function(){
   return del(['./lib', './_lib']);
});

gulp.task('precopy', function(){
   return new Promise(function(resolve, reject) {
      gulp.src(['src/**/*'])
         .pipe(gulp.dest('_lib'))
         .on('error', reject)
         .on('end', resolve)
   });
});

gulp.task('postcopy', function(){
   return new Promise(function(resolve, reject) {
      gulp.src(['_lib/**/*'])
         .pipe(gulp.dest('lib'))
         .on('error', reject)
         .on('end', resolve)
   });
});

gulp.task('postclean', function(){
   return del(['lib/**/*.jsx', '_lib']);
});

gulp.task('babel', function(cb){
   return new Promise(function(resolve, reject) {
      gulp.src(['src/**/*.js', 'src/**/*.jsx'])
         .on('error', reject)
         .pipe(babel({stage:0}))
         .pipe(gulp.dest('lib'))
         .on('end', resolve)
   });
});

gulp.task('build', gulpSequence('clean', 'precopy', 'postcopy', 'postclean', 'babel'));
