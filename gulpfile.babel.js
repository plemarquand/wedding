'use strict';

var path = require('path');
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var less = require('gulp-less');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

var lessSrc = './src/css/**/*.less';
var jsSrc = './src/js/**/*.js';
var assetSrc = './src/**/*.!(js|less)';
var bowerSrc = './bower_components/**/*.*';
var outputDir = './dist/';

gulp.task('clean', () => gulp.src('dist', {read: false})
  .pipe(rimraf()));

gulp.task('less', () => gulp.src(lessSrc)
  .pipe(less({paths: ['./css/includes']}))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false
  }))
  .pipe(gulp.dest(path.join(outputDir, 'css'))));

gulp.task('js', () => gulp.src(jsSrc)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(concat('index.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.join(outputDir, 'js'))));

gulp.task('copy_bower', () => gulp.src(bowerSrc)
  .pipe(gulp.dest(path.join(outputDir, 'bower_components'))));

gulp.task('copy_assets', () => gulp.src(assetSrc)
  .pipe(gulp.dest(outputDir)));

gulp.task('serve', () => {
  browserSync.init({server: {baseDir: outputDir}});

  gulp.watch(lessSrc, () => gulp.run('less'))
    .on('change', browserSync.reload);

  gulp.watch(jsSrc, () => gulp.run('js'))
    .on('change', browserSync.reload);

  gulp.watch(assetSrc, () => gulp.run('copy_assets'))
    .on('change', browserSync.reload);
});

gulp.task('default', (callback) => runSequence('clean', ['js', 'less', 'copy_bower', 'copy_assets', 'serve'], callback));
