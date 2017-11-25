/**
 * Lazy require task
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const gulp = require('gulp');
const path = require('path');

module.exports = function(taskName, taskFile, options, args) {
  options          = options || {};
  options.taskName = taskName;

  taskFile = path.resolve(`./gulp/tasks/${taskFile}.js`);

  gulp.task(taskName, function(cb) {
    let task = require(taskFile).call(this, options, args);

    return task(cb);
  });
};
