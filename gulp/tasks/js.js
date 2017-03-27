/**
 * Gulp-task. Build javascript.
 *
 * @since        02.04.2015 18:10
 * @license      Licensed under the MIT license
 */

const config = require('../../gulpfile');
if (!config.js) return;

const path    = require('path');
const bs      = require('browser-sync').create();
const gulp    = require('gulp');
const _if     = require('gulp-if');
const rigger  = require('gulp-rigger');
const uglify  = require('gulp-uglify');
const rename  = require('gulp-rename');
const changed = require('gulp-changed-in-place');
const tools   = require('../lib/tools');
const notify  = require('../lib/handleErrors');

const paths = {
    src  : path.join(config.root.src, config.js.src, tools.mask(config.js.extensions)),
    build: path.join(config.root.build, config.js.build)
};

gulp.task('js', function () {
    return gulp.src(paths.src)
        .pipe(rigger())
        .on('error', notify)
        .pipe(changed({firstPass: true}))
        .pipe(_if(global.production, uglify({preserveComments: 'some'})))
        .pipe(_if(global.production, rename({suffix: '.min'})))
        .pipe(gulp.dest(paths.build))
        .pipe(bs.stream({match: '**/*.css'}))
});
