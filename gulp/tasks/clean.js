/**
 * Gulp-task. Clean build directory.
 *
 * @since        02.04.2015 18:07
 * @license      Licensed under the MIT license
 */

var gulp = require('gulp');
var del = require('del');
var config = require('../config');

var cleanTask = function (cb) {
    del([config.root.build]).then(function (paths) {
        cb()
    })
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
