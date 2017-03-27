/**
 * Gulp-task. Clean build directory.
 *
 * @since        02.04.2015 18:07
 * @license      Licensed under the MIT license
 */

const config = require('../config');
if (!config.root.build) return;

const gulp = require('gulp');
const del  = require('del');

gulp.task('clean', function (cb) {
    del([config.root.build]).then(function (paths) {
        cb()
    })
});
