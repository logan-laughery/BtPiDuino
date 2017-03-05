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

gulp.task('copyHeaders', function() {
  return gulp.src(hPath)
    .pipe(flatten())
    .pipe(gulp.dest(binDest));
});

gulp.task('copyCpp', function() {
  return gulp.src(cppPath)
    .pipe(flatten())
    .pipe(gulp.dest(binDest));
});

gulp.task('copyIno', function() {
  return gulp.src(inoPath)
    .pipe(flatten())
    .pipe(gulp.dest(binDest));
});

gulp.task('build', ['cleanHeaders', 'copyHeaders', 'cleanCpp',
  'copyCpp', 'cleanIno', 'copyIno']);

gulp.task('default', function() {
  gulp.watch(hPath, ['cleanHeaders', 'copyHeaders']);
  gulp.watch(cppPath, ['cleanCpp', 'copyCpp']);
  gulp.watch(inoPath, ['cleanIno', 'copyIno']);
});

gulp.task('test', ['copyHeaders', 'copyCpp', 'copyIno']);
