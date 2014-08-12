var gulp = require('gulp');
var gbrowserify = require('../');

gulp.task('browserify', function() {
  return gulp.src('./src/*.js')
  .pipe(gbrowserify('outfile.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('default', ['browserify']);
