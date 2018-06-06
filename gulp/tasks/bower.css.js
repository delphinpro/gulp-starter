/**
 * Concat styles from libs of third party through bower package manager
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const path         = require('path');
const gulp         = require('gulp');
const concat       = require('gulp-concat');
const bower        = require('gulp-main-bower-files');
const changed      = require('gulp-changed-in-place');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');

module.exports = function (options) {

    let destination = path.join(options.root.build, options.bower.css.build);

    return function () {
        return gulp.src(options.bower.src)
            .pipe(bower('**/*.css'))
            .pipe(sourcemaps.init())
            .pipe(concat(options.bower.css.output))
            .pipe(changed({firstPass: true}))
            .pipe(autoprefixer(options.autoprefixer))
            .pipe(cleanCSS({format: 'keep-breaks', zIndex: false}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destination));
    };
};
