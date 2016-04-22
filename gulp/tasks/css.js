/**
 * Gulp-task. Build CSS.
 *
 * @since        02.04.2015 18:12
 * @license      Licensed under the MIT license
 */


var config = require('../config');
if (!config.css) return;

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');

var paths = {
    src  : path.join(config.root.src, config.css.src, '/**/*.{' + config.css.extensions + '}'),
    build: path.join(config.root.build, config.css.build)
};

var cssTask = function () {
    return gulp.src(paths.src)
        .pipe(sourceMaps.init())
        .pipe(sass(config.css.sass))
        .on('error', handleErrors)
        .pipe(autoprefixer(config.css.autoprefixer))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
};

gulp.task('css', cssTask);
module.exports = cssTask;
