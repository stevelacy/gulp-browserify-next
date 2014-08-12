var path = require('path');
var browserify = require('browserify');
var through = require('through2');
var gutil = require('gulp-util');

module.exports = function(outfile, opt) {

  if (!outfile) throw new gutil.PluginError('gulp-browserify-next', 'missing outfile name option');
  var files = [];
  var first = null;

  var buffer = function(file, enc, cb) {
    if (file.path !== void 0) {
      if (!first) first = file;
      files.push(file.path);
    }
    return cb();
  };

  var flush = function(cb) {
    var b, self;
    self = this;
    b = browserify(files);

    return b.bundle(function(err, data) {
      var newFile;
      newFile = new gutil.File({
        path: path.join(first.base, outfile),
        contents: data
      });
      self.push(newFile);
      return cb();
    });
  };
  return through.obj(buffer, flush);
};
