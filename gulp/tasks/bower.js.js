/**
 * Concat scripts from libs of third party through bower package manager
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const path       = require('path');
const gulp       = require('gulp');
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const bower      = require('gulp-main-bower-files');
const changed    = require('gulp-changed-in-place');
const sourcemaps = require('gulp-sourcemaps');

module.exports = function (options) {

    let destination = path.join(options.root.build, options.bower.js.build);

    return function (done) {
        gulp.src(options.bower.src)
            .pipe(bower('**/*.js'))
            // .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat(options.bower.js.output))
            .pipe(changed({firstPass: true}))
            // .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destination))
            .on('end', function () {
                done();
            });
    };
};
