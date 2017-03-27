/**
 * gulp-task.
 *
 * @since        09.10.2016 7:06
 * @license      Licensed under the MIT license
 */

const gulp    = require('gulp');
const changed = require('gulp-changed');
const path    = require('path');
const config  = require('../config.js');

const paths = {
    index: path.join('gulp/assets/', '**/*'),
    build: path.join(config.root.build)
};

gulp.task('assets', ['scss', 'js'], function (cb) {
    return gulp.src([paths.index])
        .pipe(changed(paths.build))
        .pipe(gulp.dest(paths.build))
});
