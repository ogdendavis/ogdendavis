'use strict';

const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const terser = require('gulp-terser');

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./src/*.css')
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

// Gulp task to pass SVG into output assets directory, unmodified
gulp.task('images', function() {
  return gulp.src(['./src/assets/*.svg'])
    .pipe(gulp.dest('./docs/assets'));
});

// Gulp task to pass static files into output home directory, unmodified
gulp.task('static', function() {
  return gulp.src(['./src/static/*'])
    .pipe(gulp.dest('./docs'));
});

// Clean output directory
gulp.task('clean', () => del(['docs']));

// Gulp task to minify all files
gulp.task('default', gulp.series('clean','styles','scripts','pages','images','static'), function (done) {
  done();
});
