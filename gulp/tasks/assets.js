/**
 * gulp-task.
 *
 * @since        09.10.2016 7:06
 * @license      Licensed under the MIT license
 */

const config         = require('../../gulpfile');
const bs             = require('browser-sync').create();
const path           = require('path');
const gulp           = require('gulp');
const sass           = require('gulp-sass');
const concat         = require('gulp-concat');
const uglify         = require('gulp-uglify');
const cssnano        = require('gulp-cssnano');
const changed        = require('gulp-changed');
const autoprefixer   = require('gulp-autoprefixer');
const changedInPlace = require('gulp-changed-in-place');
const notify         = require('../lib/handleErrors');

const paths = {
    index : path.join('gulp/assets/', '*.*'),
    output: {
        root  : config.root.build,
        assets: path.join(config.root.build, 'dev-tools'),
    }
};

gulp.task('assets:js', function () {
    return gulp.src([path.join('gulp/assets/dev-tools', '**/*.js')])
        .pipe(concat('dev.js'))
        .on('error', notify)
        .pipe(changedInPlace({firstPass: true}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.output.assets))
        .pipe(bs.stream())
});

gulp.task('assets:css', function () {
    return gulp.src([path.join('gulp/assets/dev-tools', '**/*.scss')])
        .pipe(sass(config.scss.sass))
        .on('error', notify)
        .pipe(changedInPlace({firstPass: true}))
        .pipe(autoprefixer(config.scss.autoprefixer))
        .pipe(cssnano({autoprefixer: false}))
        .pipe(gulp.dest(paths.output.assets))
        .pipe(bs.stream())
});

gulp.task('assets', ['assets:css', 'assets:js'], function () {
    return gulp.src([paths.index])
        .pipe(changed(paths.output.root))
        .pipe(gulp.dest(paths.output.root))
        .pipe(bs.stream())
});
