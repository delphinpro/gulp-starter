/**
 * Compile javascript files of project
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const path   = require('path');
const notify = require('../lib/handleErrors');

const bs            = require('browser-sync');
const gulp          = require('gulp');
const changed       = require('gulp-changed-in-place');
const webpackStream = require('piped-webpack');

module.exports = function(options) {

  let src  = path.join(options.root.src, options.webpack.src, `/*.js`);
  let dist = path.join(options.root.build, options.webpack.build);

  return function() {
    let wpConfig      = require(path.join(global.ROOT, 'webpack.config.js'));
    let bsHasInstance = bs.has(options.bs.instance);
    let bsInstance, interval;

    if (bsHasInstance) {
      bsInstance = bs.get(options.bs.instance);
      interval   = setInterval(function() {
        bsInstance.notify('<span style="color:red">Javascript is compiles...</span>', 5000);
      }, 300);
    }

    let pipeline = gulp.src(src)
    .pipe(webpackStream(wpConfig)).on('error', notify)
    .pipe(changed({firstPass: true}))
    .pipe(gulp.dest(dist));

    if (bsHasInstance) {
      pipeline = pipeline.on('end', function() {
        clearInterval(interval);
        bsInstance.reload();
      });
    }

    return pipeline;
  };
};
