/**
 * gulp-task.
 *
 * @since        09.10.2016 7:06
 * @license      Licensed under the MIT license
 */

var gulp   = require('gulp');
var path   = require('path');
var config = require('../config.js');

var paths = {
    index: path.join('gulp/assets/', '**/*'),
    build: path.join(config.root.build)
};

var assetsTask = function (cb) {
    return gulp.src([paths.index])
        .pipe(gulp.dest(paths.build))
};

gulp.task('assets', assetsTask);
