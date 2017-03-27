/**
 * gulp-task.
 *
 * @since        09.10.2016 7:06
 * @license      Licensed under the MIT license
 */

const config  = require('../../gulpfile');
const bs      = require('browser-sync').create();
const path    = require('path');
const gulp    = require('gulp');
const changed = require('gulp-changed');

const paths = {
    index: path.join('gulp/assets/', '**/*'),
    build: path.join(config.root.build)
};

gulp.task('assets', ['scss', 'js'], function () {
    return gulp.src([paths.index])
        .pipe(changed(paths.build))
        .pipe(gulp.dest(paths.build))
        .pipe(bs.stream())
});
