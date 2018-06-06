/**
 * Copy markdown docs into build directory
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2017 delphinpro
 * @license     licensed under the MIT license
 */

const bs      = require('browser-sync');
const path    = require('path');
const gulp    = require('gulp');
const changed = require('gulp-changed');

module.exports = function (options) {
    const paths = {
        src : [
            'README.md',
            'docs/**',
        ],
        dest: path.join(options.root.build, 'docs'),
    };

    return function (done) {

        gulp.src(paths.src)
            .pipe(changed(paths.dest))
            .pipe(gulp.dest(paths.dest))
            .on('end', function () {
                if (bs.has(options.bs.instance)) bs.get(options.bs.instance).reload();
                done();
            })
        ;
    };
};
