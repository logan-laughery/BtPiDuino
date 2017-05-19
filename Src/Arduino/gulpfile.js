// Simple (as in stupid) make script for c++...

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    rimraf = require('gulp-rimraf'),
    flatten = require('gulp-flatten');

var cppPath = 'src/**/*.cpp';
var hPath = 'src/**/*.h';
var inoPath = 'src/**/*.ino';
var binDest = 'bin/Octoferm';

gulp.task('cleanCpp', [], function() {
  return gulp.src(binDest + '/*.cpp', { read: false }).pipe(rimraf());
});
gulp.task('cleanHeaders', [], function() {
  return gulp.src(binDest + '/*.h', { read: false }).pipe(rimraf());
});
gulp.task('cleanIno', [], function() {
  return gulp.src(binDest + '/*.ino', { read: false }).pipe(rimraf());
});

gulp.task('copyHeaders', ['cleanHeaders'], function() {
  return gulp.src(hPath)
    .pipe(flatten())
    .pipe(gulp.dest(binDest));
});

gulp.task('copyCpp', ['cleanCpp'], function() {
  return gulp.src(cppPath)
    .pipe(flatten())
    .pipe(gulp.dest(binDest));
});

gulp.task('copyIno', ['cleanIno'], function() {
  return gulp.src(inoPath)
    .pipe(flatten())
    .pipe(gulp.dest(binDest));
});

gulp.task('build', ['copyHeaders', 'copyCpp', 'copyIno']);

gulp.task('default', function() {
  gulp.watch(hPath, ['copyHeaders']);
  gulp.watch(cppPath, ['copyCpp']);
  gulp.watch(inoPath, ['copyIno']);
});

gulp.task('test', ['copyHeaders', 'copyCpp', 'copyIno']);
