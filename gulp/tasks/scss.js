/**
 * Gulp-task. Compile SCSS.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2015-2017 delphinpro
 * @license     licensed under the MIT license
 */

const path         = require('path');
const bs           = require('browser-sync');
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const sourceMaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const changed      = require('gulp-changed-in-place');
const notify       = require('../lib/handleErrors');
const tools        = require('../lib/tools');
const resolver     = require('../lib/gulp-sass-image-resolver');

function sassFunctions(options) {
  options      = options || {};
  options.base = options.base || process.cwd();

  let fs    = require('fs');
  let path  = require('path');
  let types = require('node-sass').types;

  let funcs = {};

  funcs['b64($file)'] = function(file, done) {
    let file0 = path.resolve(options.base, file.getValue());
    let ext   = file0.split('.').pop();
    fs.readFile(file0, function(err, data) {
      if (err) return done(err);
      data = new Buffer(data);
      data = data.toString('base64');
      data = 'url(data:image/' + ext + ';base64,' + data + ')';
      data = types.String(data);
      done(data);
    });
  };

  return funcs;
}

module.exports = function(options) {

  let src   = path.join(options.root.src, options.scss.src, tools.mask(options.scss.extensions));
  let build = path.join(options.root.build, options.scss.build);

  return function(done) {
    let bsHasInstance = bs.has(options.bs.instance);
    let bsInstance;

    if (bsHasInstance) {
      bsInstance = bs.get(options.bs.instance);
    }

    let sassOpts       = options.scss.sass;
    sassOpts.functions = sassFunctions();

    let pipeline = gulp.src(src)
    .pipe(sourceMaps.init())
    .pipe(sass(sassOpts)).on('error', notify)
    .pipe(changed({firstPass: true}))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(resolver(options.scss.resolver))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(build));

    if (bsHasInstance) {
      pipeline.pipe(bsInstance.stream());
    }

    return pipeline;
  };
};
