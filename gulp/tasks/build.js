/**
 * Build gulp-task.
 *
 * @since        09.10.2016 7:06
 * @license      Licensed under the MIT license
 */

var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var config       = require('../config.js');

var buildTask = function (cb) {
    gulpSequence(config.defaultTasks, cb);
};

gulp.task('build', buildTask);
