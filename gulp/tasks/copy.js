/**
 * Copy other files
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const path    = require('path');
const bs      = require('browser-sync');
const gulp    = require('gulp');
const changed = require('gulp-changed');

let timeout;

module.exports = function(options) {

  let source = options.copy.src.map(function(item) {
    return path.join(options.root.src, item);
  });

  return function() {
    let bsHasInstance = bs.has(options.bs.instance);
    let bsInstance;

    if (bsHasInstance) {
      bsInstance = bs.get(options.bs.instance);
    }

    let pipeline = gulp.src(source)
    .pipe(changed(options.root.build))
    .pipe(gulp.dest(options.root.build));

    if (bsHasInstance) {
      pipeline = pipeline.on('end', function() {
        bsInstance.notify('<span style="color:red">Copy files...</span>', 2000);
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          bsInstance.reload();
        }, 1000);
      });
    }

    return pipeline;
  };
};
