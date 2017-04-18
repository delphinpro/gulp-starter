/**
 * @since       23.03.2017 6:27
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

"use strict";

const config = require('../../gulpfile');
if (!config.js) return;

const path   = require('path');
const notify = require('../lib/handleErrors');

const browserSync = require('browser-sync').create();
const gulp        = require('gulp');
const babel       = require('gulp-babel');
const concat      = require('gulp-concat');
const sourceMaps  = require('gulp-sourcemaps');
const uglify      = require('gulp-uglify');
const rename      = require('gulp-rename');
const changed     = require('gulp-changed-in-place');

let paths = {
    src  : path.join(config.root.src, config.js.src, '/**/*.js'),
    build: path.join(config.root.build, config.js.build)
};

gulp.task('es6', function () {
    return gulp.src(paths.src)
        .pipe(sourceMaps.init())
        .pipe(concat('build.js'))
        .on('error', notify)
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-object-rest-spread'],
        }))
        .on('error', notify)
        .pipe(changed({firstPass: true}))
        .pipe(gulp.dest(paths.build))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .on('error', notify)
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
        ;
});
