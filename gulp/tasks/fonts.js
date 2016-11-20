/**
 * Gulp-task. Build fonts.
 *
 * @since        02.04.2015 18:16
 * @license      Licensed under the MIT license
 */

var config = require('../config');
if (!config.fonts) return;

var browserSync = require('browser-sync');
var gulp        = require('gulp');
var changed     = require('gulp-changed');
var path        = require('path');

var paths = {
    src  : path.join(config.root.src, config.fonts.src, '/**/*.{' + config.fonts.extensions + '}'),
    build: path.join(config.root.build, config.fonts.build)
};

var fontsTask = function () {
    return gulp.src([paths.src])
        .pipe(changed(paths.build)) // Ignore unchanged files
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
};

gulp.task('fonts', fontsTask);
