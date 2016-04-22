/**
 * Gulp-task. Build javascript.
 *
 * @since        02.04.2015 18:10
 * @license      Licensed under the MIT license
 */

var config = require('../config');
if (!config.js) return;

var gulp = require('gulp');
var browserSync = require('browser-sync');
var rigger = require('gulp-rigger');
var handleErrors = require('../lib/handleErrors');
var path = require('path');

var paths = {
    src  : path.join(config.root.src, config.js.src, '/**/*.{' + config.js.extensions + '}'),
    build: path.join(config.root.build, config.js.build)
};

var jsTask = function () {
    return gulp.src(paths.src)
        .pipe(rigger())
        .on('error', handleErrors)
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
};

gulp.task('js', jsTask);
module.exports = jsTask;
