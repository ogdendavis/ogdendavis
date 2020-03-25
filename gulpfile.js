'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var terser = require('gulp-terser');

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./src/style.css')
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer())
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('./docs'))
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
  return gulp.src('./src/*.js')
    // Minify the file
    .pipe(terser())
    // Output
    .pipe(gulp.dest('./docs'))
});

// Gulp task to minify HTML files
gulp.task('pages', function() {
  return gulp.src(['./src/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./docs'));
});

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify all files
gulp.task('default', gulp.series('clean','styles','scripts','pages'), function (done) {
  done();
});
