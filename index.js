var path = require('path');
var browserify = require('browserify');
var through = require('through2');
var gutil = require('gulp-util');

module.exports = function(outFile, opts) {

  if (!outFile) return new gutil.PluginError('gulp-browserify-next', 'missing outFile name option');

  opts = opts ? opts : {};
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
    b = browserify(files, opts);

    return b.bundle(function(err, data) {
      var newFile = first.clone();
      newFile.path = path.join(first.base, outFile);
      newFile.contents = data;
      self.push(newFile);
      return cb();
    });
  };
  return through.obj(buffer, flush);
};
