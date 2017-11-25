/**
 * Gulp-task. Compile twig templates.
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2015-2017 delphinpro
 * @license     licensed under the MIT license
 */

const fs        = require('fs');
const path      = require('path');
const bs        = require('browser-sync');
const gulp      = require('gulp');
const data      = require('gulp-data');
const twig      = require('gulp-twig');
const changed   = require('gulp-changed-in-place');
const tools     = require('../lib/tools');
const notify    = require('../lib/handleErrors');
const functions = require('../functions.twig');

module.exports = function(options) {

  let exclude    = path.normalize('!**/{' + options.twig.excludeFolders.join(',') + '}/**');
  let extensions = options.twig.extensions.filter(item => item !== 'json');

  let src   = [
    path.join(options.root.src, options.twig.src, tools.mask(extensions)),
    exclude,
  ];
  let build = path.join(options.root.build, options.twig.build);

  function getData() {
    let dataPath = path.resolve(options.root.src, options.twig.dataFile);
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  return function() {
    let bsHasInstance = bs.has(options.bs.instance);
    let bsInstance, interval;

    if (bsHasInstance) {
      bsInstance = bs.get(options.bs.instance);
      interval   = setInterval(function() {
        bsInstance.notify('<span style="color:red">HTML is compiles...</span>', 2000);
      }, 1000);
    }

    let pipeline = gulp.src(src)
    .pipe(data(getData)).on('error', notify)
    .pipe(twig({
      base     : [path.join(options.root.src, options.twig.src)],
      functions: functions,
    })).on('error', notify)
    .pipe(changed({firstPass: true}))
    .pipe(gulp.dest(build));

    if (bsHasInstance) {
      pipeline = pipeline.on('end', function() {
        clearInterval(interval);
        bsInstance.reload();
      });
    }

    return pipeline;
  };
};
