var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('mocha',mochaTask);
gulp.task('coverage',coverageTask);

gulp.task('watch-mocha',function(){
  gulp.watch(['test/**','src/**'],['mocha']);
  mochaTask();
});

gulp.task('watch-coverage',function(){
  gulp.watch(['test/**','src/**'],['coverage']);
  coverageTask();
});

function coverageTask(cb){
  gulp.src(['src/*.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('error', logMochaError)
    .on('finish', function () {
      gulp.src(['tests/*.js'])
        .pipe(mocha(mochaOpts))
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb || function(){});
    });
}

function mochaTask(){
  return gulp.src(['test/*.js'],{read:false})
    .pipe(mocha(mochaOpts))
    .on('error',logMochaError);
}

function logMochaError(err){
  if(err && err.message){
    gutil.log(err.message);
  } else {
    gutil.log.apply(gutil,arguments);
  }
}

var mochaOpts = {
  growl:true
};