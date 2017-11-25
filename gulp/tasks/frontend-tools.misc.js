/**
 * Copy other files for tools
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const bs      = require('browser-sync');
const path    = require('path');
const gulp    = require('gulp');
const changed = require('gulp-changed');

module.exports = function(options) {
  const paths = {
    src   : {
      main  : ['gulp/frontend-tools/*.*'],
      assets: [
        'gulp/frontend-tools/classes/**',
        'gulp/frontend-tools/static/**',
      ],
    },
    output: {
      main  : options.root.build,
      assets: path.join(options.root.build, 'frontend-tools'),
    },
  };

  return function(done) {

    let pipeline = gulp.src(paths.src.main)
        .pipe(changed(paths.output.main))
        .pipe(gulp.dest(paths.output.main))
    ;

    pipeline.on('end', function() {
      gulp.src(paths.src.assets)
      .pipe(changed(paths.output.assets))
      .pipe(gulp.dest(paths.output.assets))
      .on('end', function() {
        if (bs.has(options.bs.instance)) bs.get(options.bs.instance).reload();
        done();
      });
    });
  };
};
