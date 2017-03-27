/**
 * Gulp-task. Optimize images.
 *
 * @since        02.04.2015 18:13
 * @license      Licensed under the MIT license
 */

const config = require('../config');
if (!config.images) return;

const path           = require('path');
const browserSync    = require('browser-sync');
const gulp           = require('gulp');
const changed        = require('gulp-changed');
const imagesOptimize = require('gulp-imagemin');

const paths = {
    src  : path.join(config.root.src, config.images.src, '/**/*.{' + config.images.extensions + '}'),
    build: path.join(config.root.build, config.images.build)
};

gulp.task('images', function () {
    return gulp.src([paths.src])
        .pipe(changed(paths.build))
        .pipe(imagesOptimize([
            imagesOptimize.gifsicle(),// default
            imagesOptimize.jpegtran({
                progressive: true
            }),
            imagesOptimize.optipng(),// default
            imagesOptimize.svgo()// default
        ]))
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
});
