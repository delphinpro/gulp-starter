/**
 * Gulp-task. Build javascript.
 *
 * @since        02.04.2015 18:10
 * @license      Licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.js) return;

const path       = require('path');
const bs         = require('browser-sync').create();
const gulp       = require('gulp');
const _if        = require('gulp-if');
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const rename     = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const changed    = require('gulp-changed-in-place');
const tools      = require('../lib/tools');
const notify     = require('../lib/handleErrors');

let sourceFiles = [];
if (config.js.order && config.js.order.length) {
    config.js.order.forEach(function (srcItem) {
        sourceFiles.push(path.join(config.root.src, config.js.src, srcItem))
    });
} else {
    sourceFiles.push(path.join(config.root.src, config.js.src, tools.mask(config.js.extensions)));
}

const paths = {
    src  : sourceFiles,
    build: path.join(config.root.build, config.js.build)
};

gulp.task('js', function () {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(concat(config.js.filename))
        .on('error', notify)
        .pipe(changed({firstPass: true}))
        .pipe(_if(global.production, uglify()))
        .pipe(_if(global.production, rename({suffix: '.min'})))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.build))
        .pipe(bs.stream())
});
