/**
 * Gulp-task. Build fonts.
 *
 * @since        02.04.2015 18:16
 * @license      Licensed under the MIT license
 */

const config = require('../config');
if (!config.fonts) return;

const path        = require('path');
const browserSync = require('browser-sync');
const gulp        = require('gulp');
const changed     = require('gulp-changed');

const paths = {
    src  : path.join(config.root.src, config.fonts.src, '/**/*.{' + config.fonts.extensions + '}'),
    build: path.join(config.root.build, config.fonts.build)
};

gulp.task('fonts', function () {
    return gulp.src([paths.src])
        .pipe(changed(paths.build)) // Ignore unchanged files
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
});
