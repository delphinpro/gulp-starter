/**
 * Gulp-task. Build CSS.
 *
 * @since        02.04.2015 18:12
 * @license      Licensed under the MIT license
 */


const config = require('../config');
if (!config.scss) return;

const path         = require('path');
const browserSync  = require('browser-sync');
const gulp         = require('gulp');
const _if          = require('gulp-if');
const sass         = require('gulp-sass');
const rename       = require('gulp-rename');
const cssnano      = require('gulp-cssnano');
const sourceMaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const changed      = require('gulp-changed-in-place');
const handleErrors = require('../lib/handleErrors');
const resolver     = require('../lib/gulp-sass-image-resolver');

const paths = {
    src  : path.join(config.root.src, config.scss.src, '/**/*.{' + config.scss.extensions + '}'),
    build: path.join(config.root.build, config.scss.build)
};

gulp.task('scss', function () {
    return gulp.src(paths.src)
        .pipe(_if(!global.production, sourceMaps.init()))
        .pipe(sass(config.scss.sass))
        .on('error', handleErrors)
        .pipe(changed({firstPass: true}))
        .pipe(autoprefixer(config.scss.autoprefixer))
        .pipe(_if(global.production, cssnano({autoprefixer: false})))
        .pipe(_if(!global.production, sourceMaps.write('.')))
        .pipe(_if(global.production, rename({suffix: '.min'})))
        .pipe(resolver(config.scss.resolver))
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
});
