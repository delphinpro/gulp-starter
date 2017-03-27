/**
 * Gulp-task. LiveReload.
 *
 * @since        30.06.2015 12:51
 * @license      Licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.browserSync) return;
if (global.production) return;

const bs   = require('browser-sync').create();
const gulp = require('gulp');

gulp.task('browserSync', function () {
    bs.init(config.browserSync);
});
