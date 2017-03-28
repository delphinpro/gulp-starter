/**
 * gulp-starter
 * @since       27.03.2017 20:18
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.js) return;

const path    = require('path');
const gulp    = require('gulp');
const concat  = require('gulp-concat');
const uglify  = require('gulp-uglify');
const rename  = require('gulp-rename');
const bower   = require('gulp-main-bower-files');
const changed = require('gulp-changed-in-place');

let paths = {
    js : {
        build: path.join(config.root.build, config.js.build)
    },
    css: {
        build: path.join(config.root.build, config.scss.build)
    }
};

gulp.task('vendor:js', function () {
    return gulp.src('./bower.json')
        .pipe(bower('**/*.js'))
        .pipe(concat('vendors.js'))
        .pipe(changed({firstPass: true}))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.js.build))
        ;
});

gulp.task('vendor:css', function () {
    return gulp.src('./bower.json')
        .pipe(bower('**/*.css'))
        .pipe(concat('vendors.css'))
        .pipe(changed({firstPass: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.css.build))
        ;
});

gulp.task('vendor', ['vendor:js', 'vendor:css']);
