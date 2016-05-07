/**
 * Default gulp-task.
 *
 * @since        30.06.2015 9:33
 * @license      Licensed under the MIT license
 */

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var config = require('../config.js');

var defaultTask = function (cb) {
    gulpSequence(config.defaultTasks, 'watch', cb);
};

gulp.task('default', defaultTask);
module.exports = defaultTask;
