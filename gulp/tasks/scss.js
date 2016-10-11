/**
 * Gulp-task. Build CSS.
 *
 * @since        02.04.2015 18:12
 * @license      Licensed under the MIT license
 */


var config = require('../config');
if (!config.scss) return;

var gulp         = require('gulp');
var _if          = require('gulp-if');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourceMaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path         = require('path');
var cssnano      = require('gulp-cssnano');
var rename       = require('gulp-rename');

var paths = {
    src  : path.join(config.root.src, config.scss.src, '/**/*.{' + config.scss.extensions + '}'),
    build: path.join(config.root.build, config.scss.build)
};

var scssTask = function () {
    return gulp.src(paths.src)
        .pipe(_if(!global.production, sourceMaps.init()))
        .pipe(sass(config.scss.sass))
        .on('error', handleErrors)
        .pipe(autoprefixer(config.scss.autoprefixer))
        .pipe(_if(global.production, cssnano({autoprefixer: false})))
        .pipe(_if(!global.production, sourceMaps.write('.')))
        .pipe(_if(global.production, rename({suffix: '.min'})))
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
};

gulp.task('scss', scssTask);
