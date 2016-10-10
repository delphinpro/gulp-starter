/**
 * Gulp-task. Optimize images.
 *
 * @since        02.04.2015 18:13
 * @license      Licensed under the MIT license
 */

var config = require('../config');
if (!config.images) return;

var browserSync    = require('browser-sync');
var changed        = require('gulp-changed');
var gulp           = require('gulp');
var imagesOptimize = require('gulp-imagemin');
var path           = require('path');

var paths = {
    src  : path.join(config.root.src, config.images.src, '/**/*.{' + config.images.extensions + '}'),
    build: path.join(config.root.build, config.images.build)
};

var imagesTask = function () {
    return gulp.src([paths.src])
        .pipe(changed(paths.build))
        .pipe(imagesOptimize())
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
};

gulp.task('images', imagesTask);
