/**
 * Gulp-task. LiveReload.
 *
 * @since        30.06.2015 12:51
 * @license      Licensed under the MIT license
 */

if (global.production) return;

var browserSync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config');

var browserSyncTask = function () {
    browserSync.init(config.browserSync);
};

gulp.task('browserSync', browserSyncTask);
