/**
 * Gulp-task. Build javascript.
 *
 * @since        02.04.2015 18:10
 * @license      Licensed under the MIT license
 */

var config = require('../config');
if (!config.js) return;

var browserSync  = require('browser-sync');
var gulp         = require('gulp');
var _if          = require('gulp-if');
var rigger       = require('gulp-rigger');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var changed      = require('gulp-changed-in-place');
var path         = require('path');
var handleErrors = require('../lib/handleErrors');

var paths = {
    src  : path.join(config.root.src, config.js.src, '/**/*.{' + config.js.extensions + '}'),
    build: path.join(config.root.build, config.js.build)
};

var jsTask = function () {
    return gulp.src(paths.src)
        .pipe(rigger())
        .on('error', handleErrors)
        .pipe(changed({firstPass: true}))
        .pipe(_if(global.production, uglify({preserveComments: 'some'})))
        .pipe(_if(global.production, rename({suffix: '.min'})))
        .pipe(gulp.dest(paths.build))
        .pipe(browserSync.stream())
};

gulp.task('js', jsTask);
