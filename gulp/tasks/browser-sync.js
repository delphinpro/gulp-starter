/**
 * Gulp-task. LiveReload.
 *
 * @since        30.06.2015 12:51
 * @license      Licensed under the MIT license
 */

const config = require('../config');
if (!config.browserSync) return;
if (global.production) return;

const browserSync = require('browser-sync');
const gulp        = require('gulp');

gulp.task('browserSync', function () {
    browserSync.init(config.browserSync);
});
